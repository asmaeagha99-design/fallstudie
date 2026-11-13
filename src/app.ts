import { Component, Injectable, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

const office = { street: 'Brückenweg 12', postcode: '50667', city: 'Köln' };
const pickupPrefix = office.postcode.slice(0, 2);
const requiredText = [Validators.required, Validators.pattern(/.*\S.*/)];
const dateFormat = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeZone: 'Europe/Berlin' });
const timeFormat = new Intl.DateTimeFormat('de-DE', { timeStyle: 'short', timeZone: 'Europe/Berlin' });

interface Donation {
  method: string;
  clothing: string;
  region: string;
  date: string;
  time: string;
  place: string;
}

@Injectable({ providedIn: 'root' })
class RegistrationState {
  readonly donation = signal<Donation | null>(null);
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html'
})
export class App {}

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly router = inject(Router);
  private readonly state = inject(RegistrationState);

  readonly office = office;
  readonly prefix = pickupPrefix;
  readonly clothing = ['Erwachsenenkleidung', 'Kinderkleidung', 'Winterkleidung', 'Schuhe', 'Gemischte Kleidung'];
  readonly regions = ['Ukraine', 'Sudan', 'Syrien'];
  readonly submitted = signal(false);

  readonly address = this.fb.group({
    street: ['', [...requiredText, Validators.maxLength(100)]],
    house: ['', [...requiredText, Validators.maxLength(15)]],
    postcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/), this.checkCoverage]],
    city: ['', [...requiredText, Validators.maxLength(80)]]
  });

  readonly form = this.fb.group({
    method: this.fb.control<'office' | 'pickup'>('office'),
    clothing: ['', Validators.required],
    region: ['', Validators.required],
    address: this.address
  });

  constructor() {
    this.address.disable();
  }

  private checkCoverage(control: AbstractControl<string>) {
    return /^\d{5}$/.test(control.value) && !control.value.startsWith(pickupPrefix)
      ? { coverage: true }
      : null;
  }

  changeMethod(method: 'office' | 'pickup') {
    this.form.controls.method.setValue(method);
    if (method === 'pickup') {
      this.address.enable();
    } else {
      this.address.disable();
    }
  }

  invalid(control: AbstractControl) {
    return control.invalid && (control.touched || this.submitted());
  }

  register() {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { method, clothing, region, address } = this.form.getRawValue();
    const now = new Date();
    const place = method === 'pickup'
      ? `${address.street.trim()} ${address.house.trim()}, ${address.postcode} ${address.city.trim()}`
      : `${office.street}, ${office.postcode} ${office.city}`;

    this.state.donation.set({
      method: method === 'pickup' ? 'Abholung' : 'Übergabe an der Geschäftsstelle',
      clothing, region, place,
      date: dateFormat.format(now),
      time: timeFormat.format(now)
    });
    void this.router.navigate(['/bestaetigung']);
  }
}

@Component({ imports: [RouterLink], templateUrl: './confirmation.html' })
export class Confirmation {
  private readonly state = inject(RegistrationState);
  readonly donation = this.state.donation.asReadonly();

  reset() {
    this.state.donation.set(null);
  }
}

@Component({ imports: [RouterLink], templateUrl: './information.html' })
export class Information {
  readonly page = inject(ActivatedRoute).snapshot.data['page'];
  readonly office = office;
  readonly prefix = pickupPrefix;
}
