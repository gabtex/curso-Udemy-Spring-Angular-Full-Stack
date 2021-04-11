import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../clientes.service';

import { Router } from '@angular/router';
import { ClientesModule } from '../clientes.module';
import { Cliente } from '../clientes';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  cliente: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: ClientesService,
    private router: Router) { }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe(resposta => this.cliente = resposta);
  }

  novoCadastro() {
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.service
      .deletar(this.clienteSelecionado)
      .subscribe(
        response => {this.mensagemSucesso = 'Cliente deletado com sucesso!'
        this.ngOnInit();
      },
        erro => this.mensagemErro = 'Erro ao deletar o cliente.'

      )
  }

}
