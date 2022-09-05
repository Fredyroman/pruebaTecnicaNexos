import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { CargosService } from './services/cargos/cargos.service';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { MercanciaService } from './services/mercancia/mercancia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mercanciaForm: FormGroup;
  usuarios: any;
  cargos: any;
  mercancias: any;

  constructor(
    public fb: FormBuilder,
    public cargosService: CargosService,
    public usuariosService: UsuariosService,
    public mercanciaService: MercanciaService,
  ){
    
  }
  ngOnInit(): void {
    this.mercanciaForm = this.fb.group({
      id: [''],
      nombre : ['', Validators.required],
      porducto :['',  Validators.required],
      cantidad : ['',  Validators.required],
      fechaIngreso : ['',  Validators.required],
      cargo : ['',  Validators.required],
      usuarioCreacion : ['',  Validators.required],
    });

    this.cargosService.getAllCargos().subscribe(resp =>{
      this.cargos = resp;
      //console.log(resp);
    },
      error => { console.error(error)}
    );
    
    this.mercanciaService.getAllMercancias().subscribe(resp =>{
      this.mercancias = resp;
      // console.log(resp);
    },
      error => {console.error(error)}
    );

    this.mercanciaForm.get('cargo').valueChanges.subscribe(value => {
      this.usuariosService.getAllUsuariosByCargo(value.id).subscribe(resp =>{
        this.usuarios = resp;
       // console.log(resp);
      },
        error => { console.error(error)}
      )
    })

  }


  guardar():void{
    this.mercanciaService.saveMercancia(this.mercanciaForm.value).subscribe(resp =>{
      this.mercanciaForm.reset();
      this.mercancias = this.mercancias.filter(mercancia => resp.id !== mercancia.id);
      this.mercancias.push(resp);
    },
    error => {console.error(error)}
    )
  }

  eliminar(mercancia){
    this.mercanciaService.deleteMercancia(mercancia.id).subscribe(resp => {
      console.log(resp)
      if(resp===false){
        console.log("entra resp===true ");
        this.mercancias.pop(mercancia);
      }
    })
  }

  editar(mercancia){
    this.mercanciaForm.setValue({
      id: mercancia.id,
      nombre: mercancia.nombre, 
      porducto: mercancia.porducto, 
      cantidad: mercancia.cantidad, 
      fechaIngreso: mercancia.fechaIngreso, 
      cargo: mercancia.usuarioCreacion.cargo, 
      usuarioCreacion: mercancia.usuarioCreacion, 
    })
  }

  
  
}
