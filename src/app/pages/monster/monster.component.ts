import { MonsterType } from './../../utils/monster.utils';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Monster } from '../../model/monster.model';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,PlayingCardComponent],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private monsterService = inject(MonsterService);

  monsterId = -1;
  routeSubscription : Subscription | null = null;
  formSubscription : Subscription | null = null;
  monsterTypes = Object.values(MonsterType);
  

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
 		image: ['', [Validators.required]],
 		monsterType: [MonsterType.ELECTRIC, [Validators.required]],
 		hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
 		figureCaption: ['', [Validators.required]],
 		attackName: ['', [Validators.required]],
 		attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
 		attackDescription: ['', [Validators.required]]
  });

  monster : Monster = Object.assign(new Monster(), this.formGroup.value);

  /*formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
 		image: new FormControl('', [Validators.required]),
 		monsterType: new FormControl(MonsterType.ELECTRIC, [Validators.required]),
 		hp: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(200)]),
 		figureCaption: new FormControl('', [Validators.required]),
 		attackName: new FormControl('', [Validators.required]),
 		attackStrength: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(200)]),
 		attackDescription: new FormControl('', [Validators.required])
  });*/

  constructor(){
  }
  
  ngOnInit(): void {
    //const params = this.route.snapshot.params;
    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['id'] ){
        this.monsterId = parseInt(params['id']);
        const monsterFound = this.monsterService.get(this.monsterId);
        if(monsterFound){
          this.monster = monsterFound;
          this.formGroup.patchValue(this.monster);
        }

      }
    })
    this.formSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster,data);
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formSubscription?.unsubscribe();
  }

  

  submit(event : Event){
    event.preventDefault();
    if(this.monsterId == -1){
      this.monsterService.add(this.monster);
    }
    else{
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }

  isFieldInvalid(name : string){
    return this.formGroup.get(name)?.invalid && (this.formGroup.get(name)?.dirty || this.formGroup.get(name)?.touched)
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file); reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string
        });
      };
    }
  }

  navigateBack(){
    this.router.navigate(['/home']);
  }

}


