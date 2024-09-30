import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private sideNavService: SidenavService, private router: Router) {}
  
  ngOnInit(): void {
  }

  toggle(){
    this.sideNavService.changeOpen(true);
  }

  navigateTo(route: string){
    this.router.navigate([`${route}`]);
  }
}
