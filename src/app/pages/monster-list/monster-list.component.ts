import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../model/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [PlayingCardComponent,SearchBarComponent,RouterLink],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {

  monsterService = inject(MonsterService);
  router = inject(Router);
  search = model('');
  monsters = signal<Monster[]>([]);

  filtredMonsters = computed(() => {
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  })
  

  constructor(){
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    this.router.navigate(['/monster']);
  }
}
