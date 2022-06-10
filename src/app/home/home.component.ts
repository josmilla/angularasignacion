import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core';
import { ListaCargaI } from '../core/models/listaSiga.interface';
import { ApiService } from '../core/services/api.service'
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
 

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
  AsignacionCargaAll:any;
  AsignacionSquad:any;
  AsignacionRol:any;
  AsignacionTribu:any;
  AsignacionAplicativo:any;
  tcarga:any
  tcargaall:any;
  tsquad:any;
  trol:any;
  ttribu:any;
  tapp:any;
  estadoapp:any;
  mi_fecha:any;
  
  accessToken = '';
  refreshToken = '';
  usuario:any;
  estadobusqueda:any;
  

  constructor(public authService: AuthService, private api:ApiService, private route: ActivatedRoute,  ) {
    

  }

  
  
  ngOnInit(): void {
     
  
     
    this.iduser();
    
   
  
      this.listarsaplicativo();
      this.listarstribu();
      this.listarsquad();
    
      this.listarsrol();

     
   
    this.mi_fecha= new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)

}
// listarsiga()  {
//    debugger
//   this.api.getAllCargaSiga().subscribe((todos:any) => {
//     this.AsignacionCarga = todos;
//     this.tcarga=todos.length;
//     
//   });

// }

iduser(){

  this.authService.getusuariorol().subscribe((datauser:any) => {
     this.usuario = datauser;
     this.listarsigaidchapter(this.usuario.username) 
     
     
  });
 
 //debugger
}

listarsigaidchapter(id:any)  {
 // this.AsignacionCarga = [];
debugger
  this.api.getchaptersiga(id).subscribe((datacarga:any) => {
   this.AsignacionCarga = datacarga;
  
   this.tcarga=datacarga.length;
   if (this.tcarga>0) { 
    debugger 
    this.estadobusqueda=true
    
  } else { this.estadobusqueda=false
    this.AsignacionCarga = [];
    }
       
  });
 
  if (!this.estadobusqueda == true){
   
    this.api.getAllCargaSiga().subscribe((todos:any) => {
      this.AsignacionCarga = todos;
      this.tcargaall=todos.length;
      });
    }
  
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