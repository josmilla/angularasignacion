import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ListaAsignacionI } from '../core/models/listaAsignacion.interface';
import { ListaRol } from '../core/models/listaRol.interface'
 
 import { ListaCargaI} from '../core/models/listaSiga.interface'
 
import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  //form: FormGroup;
  retornoid:any;
  value:any;
  carga=[]  as ListaCargaI[];
 // roles=[]  as ListaRol[];
 // aplicativo=[]  as ListaAplicativo[];
 // squad=[]  as ListaSquad[];
 // ruta:any;
 asignacion: any;
 asignacionnew:any ={};
 // link:any; 
 //sub: any;
  id:any;
  idroles:any;
  idapp:any;
  idsquad:any;
  
 // selectedRol: any;  
   
 datosAsignacion= []  as ListaAsignacionI[];
  datatotalrol = []  as ListaRol[];
  addForm : FormGroup;
 // btnName:string="";
 selectedId: any;
  mi_fechaasigna:any;

  asignacionModel= [] as ListaAsignacionI[];
  

  constructor(private route: ActivatedRoute, private router:Router, private api:ApiService, public authService: AuthService ,private formBuilder: FormBuilder) 
   
  {
    

    this.addForm = this.formBuilder.group({

    idPorcentajeAsignacion:[''],
    matriculaUsuario:[''],
    apellidopaternoUsuario: [''],
    apellidomaternoUsuario: [''],
    nombreUsuario: [''],
    nombreChapter: [''],
    matriculaChapter: [''],
    idRol: [''],
    especialidad: [''],
    idSquad: [''],
    idAplicativo: [''],
    porcentaje: [''],
    comentarios: [''],
    fechaPeriodoAprobado: [''],
    fechaRegistro: [''],
    usuarioRegistro: [''],
    fechaModificacion: [''],
    usuarioModificacion: [''],
    estado: [''],
    estadoRegistro: [''],
    
    });
   }

ngOnInit(): void {
  
  this.mi_fechaasigna= new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)
  this.listasiga();
 
  this.api.getAllRol().subscribe((res)=>{
    this.idroles = res;
  });

  this.api.getAllAplicativo().subscribe((res)=>{
    this.idapp = res.filter(item => item.estado!==false);
  });


  // this.api.deleteAsignacion(id).subscribe(res => {
  //   this.Asignacionusuario = this.Asignacionusuario.filter(item => item.idPorcentajeAsignacion !== id);

  this.api.getAllSquad().subscribe((res)=>{
    this.idsquad = res;
  });

 

  this.selectedId = this.route.snapshot.paramMap.get('id')!=undefined?this.route.snapshot.paramMap.get('id'):0;

 
 }
 view(v:any) {    
  this.router.navigate(["/dashboard/" + v]);  }

 onSubmit(formData:any) {
  // debugger
  this.api.createAsignar(formData).subscribe(res => {
    
    this.router.navigate(["/dashboard/"+res.matriculaUsuario]);
 //   this.view(res.matriculaUsuario)
 
  });

} 
 listasiga(){
  this.id = this.route.snapshot.paramMap.get('id');
  this.retornoid=this.id;
  this.api.getmatriculasiga(this.id).subscribe((data: any) => {
    this.carga= data;
     this.addForm.patchValue(data);
   
  },()=>alert("Matricula de Usuario no encontrado"))

 }

 


// listarasignar(): void {
//   //  this.api.getAllAsignacion().subscribe((data:any)=>{this.datosAsignacion=data})
//     this.id = this.route.snapshot.paramMap.get('id');
//     debugger
//     if (this.id){
//       this.api.getSingleAsignacion(this.id).subscribe((data: any) => {
//         this.asignacion= data;
//         this.addForm.patchValue(data);
//       },()=>alert("ID no encontrado"))
//     }
//   }

 
 submitForm() {

 // this.asignacionnew = this.addForm.value;
this.asignacionnew.matriculaUsuario=this.addForm.value.matriculaUsuario;
this.asignacionnew.apellidopaternoUsuario=this.addForm.value.apellidopaternoUsuario;
this.asignacionnew.apellidomaternoUsuario=this.addForm.value.apellidopaternoUsuario;
 this.asignacionnew.nombreUsuario=this.addForm.value.nombreUsuario;
this.asignacionnew.nombreChapter=this.addForm.value.nombreChapter;
this.asignacionnew .matriculaChapter=this.addForm.value.matriculaChapter;
this.asignacionnew .idRol= Number (this.addForm.value.idRol);
this.asignacionnew.especialidad=this.addForm.value.especialidad;
this.asignacionnew.idSquad= Number (this.addForm.value.idSquad);
   
this.asignacionnew.idAplicativo=Number ( this.addForm.value.idAplicativo);
this.asignacionnew.porcentaje=this.addForm.value.porcentaje;
this.asignacionnew.comentarios=this.addForm.value.comentarios;
this.asignacionnew.fechaPeriodoAprobado=this.addForm.value.fechaPeriodoAprobado;
this.asignacionnew.fechaRegistro=this.addForm.value.fechaRegistro;
this.asignacionnew.usuarioRegistro=this.addForm.value.usuarioRegistro;
 
this.asignacionnew.fechaModificacion=this.addForm.value.fechaModificacion;
this.asignacionnew.usuarioModificacion=this.addForm.value.usuarioModificacion;
this.asignacionnew.estado=this.addForm.value.estado;
this.asignacionnew.estadoRegistro=this.addForm.value.estadoRegistro;
 debugger
this.api.createAsignar(this.asignacionnew).subscribe(res => {

 this.router.navigate(["/dashboard/"+res.matriculaUsuario]);
 
},
 (err) => {
alert("hubo un error al agregar, inténtalo de nuevo más tarde")
});

     
 
   
} 
 

listarsignacion (): void {
  //  this.api.getAllAsignacion().subscribe((data:any)=>{this.datosAsignacion=data})
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id){
      this.api.getSingleAsignacion(this.id).subscribe((data: any) => {
        this.datosAsignacion = data;
        this.addForm.patchValue(data);
      },()=>alert("Rol no encontrado"))
    }
  }

get matriculaUsuario() { return this.addForm.get('matriculaUsuario'); }
get apellidopaternoUsuario() { return this.addForm.get('apellidopaternoUsuario'); }
get apellidomaternoUsuario() { return this.addForm.get('apellidomaternoUsuario'); }
get nombreUsuario() { return this.addForm.get('nombreUsuario'); }
get nombreChapter() { return this.addForm.get('nombreChapter'); }
get matriculaChapter() { return this.addForm.get('matriculaChapter'); }
get idRol() { return this.addForm.get('idRol'); }
get especialidad() { return this.addForm.get('especialidad='); }
get idSquad() { return this.addForm.get('idSquad'); }
get idAplicativo() { return this.addForm.get('idAplicativo'); }
get porcentaje() { return this.addForm.get('porcentaje'); }
get comentarios() { return this.addForm.get('comentarios'); }
get fechaPeriodoAprobado() { return this.addForm.get('fechaPeriodoAprobado'); }
get fechaRegistro() { return this.addForm.get('fechaRegistro'); }
get usuarioRegistro() { return this.addForm.get('usuarioRegistro'); }
//get fechaModificacion() { return this.addForm.get('fechaModificacion'); }
get usuarioModificacion() { return this.addForm.get('usuarioModificacion'); }
get estado() { return this.addForm.get('estado'); } 
 
}


 