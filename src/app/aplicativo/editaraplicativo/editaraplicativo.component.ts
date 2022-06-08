 
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators  } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core';
import { first } from "rxjs/operators";


@Component({
  selector: 'app-editaraplicativo',
  templateUrl: './editaraplicativo.component.html',
  styleUrls: ['./editaraplicativo.component.css']
})
export class EditaraplicativoComponent implements OnInit {

id:any; 
 idapp:any;
  
   
  editForm;
  mi_fecha:any;

  constructor(private route: ActivatedRoute, private router:Router, private api:ApiService, public authService: AuthService ,private formBuilder: FormBuilder) 
   
  {
    

    this.editForm = this.formBuilder.group({

    idAplicativo:[''],
    codAplicativo:[''],
    nombreAplicativo: ['',Validators.required],
    biddingblockAplicativo: ['',Validators.required],
    estadoAplicativo: ['',Validators.required],
     
    usuarioRegistro: [''],
     
    usuarioModificacion: [''],
    estado: [''],


    });
   }

ngOnInit(): void {


 
  this.mi_fecha= new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)
  //console.log(this.mi_fecha);
 
  this.listarapp();
  
}

listarapp (): void {
     
  this.id = this.route.snapshot.paramMap.get('id');
 
  if (this.id){
    this.api.getappid(this.id).subscribe((data: any) => {
      this.idapp = data;
       
      this.editForm.patchValue(data);
      
    },()=>alert("Código no encontrado"))
  }
 }
 

onSubmit(formData:any) {

  this.api.updateaplicativo(this.id, formData.value)
  .pipe(first())
  .subscribe(
    data => {
      this.router.navigate(['/aplicativo']);
    },
    error => {
      alert(error);
    });



    
      // this.api.updateaplicativo(this.id, formData.value).subscribe(res => {
      // this.router.navigate(['/aplicativo'])
      // });
    
  } 

   
}
