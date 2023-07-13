import React, { Component } from 'react';
import axios from 'axios';


export default class NewWire extends Component {
  constructor() {
    super();

    this.state = {
      ownerID: 0,
      orden: "",
      edicion: "",
      zona1: "",
      zona2: "",
      zona3: "",
      zona4: "",
      zona5: "",
      zona6: "",
      zona7: "",
      zona8: "",
      zona9: "",
      zona10: "",
      zona11: "",
      zona12: "",
      cableNum: "",
      codigPant: "",
      senalPant: "",
      subPant: "",
      clase: "",
      lugarpro: "",
      aparatopro: "",
      bornapro: "",
      esquemapro: "",
      lugardes: "",
      aparatodes: "",
      bornades: "",
      esquemades: "",
      seccion: "",
      longitud: "",
      codigocabl: "",
      terminalor: "",
      terminalde: "",
      observacion: "",
      numMazo: "",
      codigo: "",
      potencial: "",
      peso: "",
      codrefcabl: "",
      codreftori: "",
      codreftdes: "",
      numSolucion: "",
      seguridad: "",
      etiqueta: "",
      etiquetaPant: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {}

  render() {
    return (
      <div>
        <form
          onSbmit={ this.handleSubmit }
          className='wire-register-form-wrapper'
        >
          <div className='three-column'>
            <input
              type="text"
              name="ownerID"
              placeholder="List ID"
              value={ this.state.ownderID }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="orden"
              placeholder="Orden"
              value={ this.state.orden }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="edicion"
              placeholder="Edicion"
              value={ this.state.edicion }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona1"
              placeholder="Zona1"
              value={ this.state.zona1 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona2"
              placeholder="Zona2"
              value={ this.state.zona2 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona3"
              placeholder="Zona3"
              value={ this.state.zona3 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona4"
              placeholder="Zona4"
              value={ this.state.zona4 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona5"
              placeholder="Zona5"
              value={ this.state.zona5 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona6"
              placeholder="Zona6"
              value={ this.state.zona6 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona7"
              placeholder="Zona7"
              value={ this.state.zona7 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona8"
              placeholder="Zona8"
              value={ this.state.zona8 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona9"
              placeholder="Zona9"
              value={ this.state.zona9 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona10"
              placeholder="Zona10"
              value={ this.state.zona10 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona11"
              placeholder="Zona11"
              value={ this.state.zona11 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="zona12"
              placeholder="Zona12"
              value={ this.state.zona12 }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="cableNum"
              placeholder="Cable_num"
              value={ this.state.cableNum }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="codigPant"
              placeholder="Codig_pant"
              value={ this.state.codigPant }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="senalPant"
              placeholder="Senal_Pant"
              value={ this.state.senalPant }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="subPant"
              placeholder="Sub_pant"
              value={ this.state.subPant }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="clase"
              placeholder="Clase"
              value={ this.state.clase }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="lugarpro"
              placeholder="Lugarpro"
              value={ this.state.lugarpro }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="aparatopro"
              placeholder="Aparatopro"
              value={ this.state.aparatopro }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="bornapro"
              placeholder="Bornapro"
              value={ this.state.bornapro }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="esquemapro"
              placeholder="Esquemapro"
              value={ this.state.esquemapro }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="lugardes"
              placeholder="Lugardes"
              value={ this.state.lugardes }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="aparatodes"
              placeholder="Aparatodes"
              value={ this.state.aparatodes }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="bornades"
              placeholder="Bornades"
              value={ this.state.bornades }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="esquemades"
              placeholder="Esquemades"
              value={ this.state.esquemades }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="seccion"
              placeholder="Seccion"
              value={ this.state.seccion }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="longitud"
              placeholder="Longitud"
              value={ this.state.longitud }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="codigocabl"
              placeholder="Codigocabl"
              value={ this.state.codigocabl }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="terminalor"
              placeholder="Terminalor"
              value={ this.state.terminalor }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="terminalde"
              placeholder="Terminalde"
              value={ this.state.terminalde }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="observacion"
              placeholder="Observacion"
              value={ this.state.observacion }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="numMazo"
              placeholder="num_mazo"
              value={ this.state.numMazo }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="codigo"
              placeholder="Codigo"
              value={ this.state.codigo }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="potencial"
              placeholder="Potencial"
              value={ this.state.potencial }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="peso"
              placeholder="Peso"
              value={ this.state.peso }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="codrefcabl"
              placeholder="Codrefcabl"
              value={ this.state.codrefcabl }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="codreftori"
              placeholder="Codreftori"
              value={ this.state.codreftori }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="codreftdes"
              placeholder="Codreftdes"
              value={ this.state.codreftdes }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="numSolucion"
              placeholder="Num_solucion"
              value={ this.state.numSolucion }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="seguridad"
              placeholder="Seguridad"
              value={ this.state.seguridad }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="etiqueta"
              placeholder="Etiqueta"
              value={ this.state.etiqueta }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="etiquetaPant"
              placeholder="Etiqueta_pant"
              value={ this.state.etiquetaPant }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}