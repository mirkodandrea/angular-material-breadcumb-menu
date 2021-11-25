import { transition, trigger, useAnimation } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject } from 'rxjs';
import { animation, animate, style, query, stagger } from '@angular/animations';

import { folders as _folders } from './folders';

export interface FolderView {
  id: string;
  name: string;
  descr: string;
  choices: Choice[];
}

export interface Choice {
  id: string;
  name: string;
  descr: string;
  choices?: Choice[];
  //opened?: boolean;
  layers?: number[];
}

@Component({
  selector: 'bread-cumb-menu',
  templateUrl: './bread-cumb-menu.component.html',
  styleUrls: ['./bread-cumb-menu.component.scss'],
})
export class BreadCumbMenuComponent implements OnInit {
  folders = null;

  menuHeader = [];
  menuChoices: Choice[];

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor() {}

  ngOnInit() {
    this.folders = _folders;
    const baseMenu = {
      id: '__all__',
      name: 'All',
      choices: this.folders.choices,
      layers: null,
    };
    this.menuHeader = [baseMenu];
  }

  selectChoiche(choice: Choice, $event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    const index = this.menuHeader.findIndex((c) => c.id === choice.id);
    const lastIndex = this.menuHeader.length - 1;

    if (index === lastIndex) {
      this.menuChoices = choice.choices;
      this.trigger.openMenu();
      return;
    }

    if (index < 0) {
      // append new choice
      if (choice.choices?.length == 0) {
        this.trigger.closeMenu();
      } else {
        this.menuChoices = choice.choices;
      }
      this.menuHeader = [...this.menuHeader, choice];
    } else {
      // choice already selected, close menu and remove choices beyond it;
      this.menuHeader = [...this.menuHeader].splice(0, lastIndex - index);
      this.trigger.closeMenu();
    }
  }

  trackChoice(index: number, choice: Choice) {
    return choice.id;
  }
}
