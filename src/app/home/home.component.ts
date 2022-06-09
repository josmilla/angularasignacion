import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core';
import { ListaCargaI } from '../core/models/listaSiga.interface';
import { ApiService } from '../core/services/api.service'
import { Router, ActivatedRoute } from '@angular/router';
 
 

import * as Chartist from 'chartist';
 

//import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  

  
  


  /*  //*/
  
  AsignacionCarga:any;
  AsignacionSquad:any;
  AsignacionRol:any;
  AsignacionTribu:any;
  AsignacionAplicativo:any;
  tcarga:any
  tsquad:any;
  trol:any;
  ttribu:any;
  tapp:any;
  estadoapp:any;
  mi_fecha:any;
  
  accessToken = '';
  refreshToken = '';
  usuario:any;
  user$:any;
 
  
  constructor(public authService: AuthService, private api:ApiService, private route: ActivatedRoute,) {
    debugger
    this.user$ = this.authService.user$;

  }

  
  
  ngOnInit(): void {
     
 
    /*/*/
     
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
     this.usuario = "0U21627";
    

     if (this.usuario =="0U21627"){
      
     this.listarsigaidchapter(this.usuario)
     debugger
     } else { this.listarsiga(); }

      this.listarsiga();
      this.listarsaplicativo();
      this.listarstribu();
      this.listarsquad();
      this.listarsrol();

     
   
    this.mi_fecha= new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)

}
listarsiga()  {
   
  this.api.getAllCargaSiga().subscribe((datacarga:any) => {
    this.AsignacionCarga = datacarga;
    this.tcarga=datacarga.length;
       
  });

}

listarsigaidchapter(idchapter:any)  {
   

  this.api.getAllCargaSiga().subscribe((datacarga:any) => {
  this.AsignacionCarga = this.AsignacionCarga.filter((item:any) => item.matriculaChapter ==idchapter);
  debugger
   // this.AsignacionCarga = datacarga;
  this.tcarga=datacarga.length;
       
  });

}

listarsquad()  {
   
  this.api.getAllSquad().subscribe((datacarga:any) => {
    this.AsignacionSquad = datacarga;
    this.tsquad=datacarga.length;
       
  });

}

listarsrol()  {
   
  this.api.getAllRol().subscribe((datacarga:any) => {
    this.AsignacionRol = datacarga;
    this.trol=datacarga.length;
       
  });

}
 
listarstribu()  {
   
  this.api.getAllTribucoe().subscribe((datacarga:any) => {
    this.AsignacionTribu = datacarga;
    this.ttribu=datacarga.length;
       
  });

}

listarsaplicativo()  {
   
  this.api.getAllAplicativo().subscribe((datacarga:any) => {
    this.AsignacionAplicativo = datacarga;
    this.tapp=datacarga.length;  
   
     
  });

}

 
 

}