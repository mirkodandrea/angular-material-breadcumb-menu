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
import { AfterViewInit } from '@angular/core/src/metadata';

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
  animations: [
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateX(0px)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0px)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateX(-100%)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class BreadCumbMenuComponent implements OnInit, AfterViewInit {
  folders = null;

  menuHeader = [];

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor() {}

  ngOnInit() {
    this.folders = _folders;
    const baseMenu = {
      id: '__all__',
      name: 'All',
      choices: this.folders.choices,
    };
    this.menuHeader = [baseMenu];
  }

  ngAfterViewInit() {
    //this.trigger.openMenu();
  }

  selectChoiche(choice: Choice, $event: Event) {
    console.log(choice);
    $event.preventDefault();
    $event.stopPropagation();
    const index = this.menuHeader.findIndex((c) => c.id === choice.id);
    const lastIndex = this.menuHeader.length - 1;

    if (index === lastIndex) {
      this.trigger.openMenu();
      return;
    }

    if (index < 0) {
      // append new choice
      if (choice.choices?.length == 0) {
        //this.trigger.closeMenu();
      }
      this.menuHeader = [...this.menuHeader, choice];
    } else {
      // choice already selected, close menu and remove choices beyond it;
      this.menuHeader = [...this.menuHeader].slice(0, index + 1);
      //this.trigger.closeMenu();
    }
  }

  trackChoice(index: number, choice: Choice) {
    return choice.id;
  }
}
