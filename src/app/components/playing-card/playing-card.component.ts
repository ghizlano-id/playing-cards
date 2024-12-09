import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Monster } from '../../model/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  standalone: true,
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent implements OnChanges{
  
   /*@Input({
    alias : 'my-monster',
    transform : (value : Monster) => {
      value.hp = value.hp / 2;
      return value;
    }
   }) */
  @Input() monster : Monster = new Monster();
  monsterTypeIcon: string = 'assets/img/electric.png';
	backgroundColor: string = 'rgba(255, 255, 104)';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['monster']){
      if(changes['monster'].previousValue?.type != changes['monster'].currentValue.type){
        this.monsterTypeIcon = MonsterTypeProperties[this.monster.type].imageUrl;
        this.backgroundColor = MonsterTypeProperties[this.monster.type].color;
      }
    }
    
  }
  
}
