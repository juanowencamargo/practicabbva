import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyJsonNew';
  url:string = "https://api.datos.gob.mx/v2/Releases_SFP";
  dtOptions: DataTables.Settings = {};
  listDatos: any | undefined;

  constructor(private http:HttpClient){
  }

  ngOnInit(): void{

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      info: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      },
      ajax: () => {
        this.http.get(this.url).subscribe((resp:any)=>{
            this.listDatos = resp.results;
              console.log(resp);
          });
      },
      columns: [{ data: 'id' }, { data: 'ocid' }, { data: 'buyer' }]
    };
  }
}
