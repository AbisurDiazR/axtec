import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private sideNavService: SidenavService) {}
  
  ngOnInit(): void {
  }

  toggle(){
    this.sideNavService.changeOpen(true);
  }
}
