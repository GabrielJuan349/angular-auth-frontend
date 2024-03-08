import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerForm:FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    validate_password: ['', [Validators.required, Validators.minLength(6)]]
  },
  {
    validators: this.isFieldOneEqualToFieldTwo('password', 'validate_password')

  });

  register() {
    const { name, email, password } = this.registerForm.value;
    this.authService.register(name, email, password)
      .subscribe({
        next: () => {
          console.log('Registration successful');
          this.router.navigateByUrl('/dashboard');
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        }
      })
  }

  private isFieldOneEqualToFieldTwo(field1:string, field2:string) {
    return (formGroup:AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;
      if(pass1 !== pass2){
        formGroup.get(field2)?.setErrors({noEqual: true});
        return {noEqual: true};
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }
}
