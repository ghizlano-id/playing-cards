import { Component, computed, inject, model, OnDestroy, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{
  
  title = 'playing-cards';

  loginService = inject(LoginService);
  router = inject(Router);
  loginSubscription: Subscription | null = null;
  

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  logout(){
    this.loginSubscription = this.loginService.logout().subscribe({
      next : _ => {
        this.navigateToLogin();
      },
      error : _ => {
        this.navigateToLogin();
      }
    })
  }

  
}
