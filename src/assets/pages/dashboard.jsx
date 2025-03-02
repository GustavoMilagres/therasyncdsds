// dashboard.jsx
import React, { useState } from 'react';
import '../styles/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Debitos from '../components/debitos/debitos.jsx';
import { Button } from 'react-bootstrap';
import Ganhos from '../components/ganhos/ganhos.jsx';
import Lucro from '../components/Lucro/lucro.jsx';
import MediaConsulta from '../components/MediaConsulta/MediaConsulta.jsx';
import MyDoughnutChart from '../components/GraficoPizzaSaidas/Pizza.jsx';
import MyLineChart from '../components/GraficoLinhas/linhas.jsx';
import ListaFluxo from '../components/listaFluxo/listaFluxo.jsx';
import ModalAddGanhos from '../components/ModalAddGanhos.jsx';
import ModalAddGastos from '../components/ModalAddGastos.jsx';
import GraficoCreditos from '../components/GraficoPizzaGanhos/PizzaGanhos.jsx';
import MyBarChart from '../components/GraficoBarras/barras.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { FcBarChart } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";

const Dashboard = () => {
  const dataAtual = new Date();
  const [mes, setMes] = useState(dataAtual.getMonth());
  const [ano, setAno] = useState(dataAtual.getFullYear());
  const [periodo, setPeriodo] = useState({ mes: dataAtual.getMonth(), ano: dataAtual.getFullYear() });
  const [dadosAtualizados, setDadosAtualizados] = useState(false);

  const handleBuscar = () => {
    setPeriodo({ mes, ano });
    setDadosAtualizados(prev => !prev);
  };


  const [showGanhos, setShowGanhos] = useState(true); 
  const showGanhosGraph = () => setShowGanhos(true); 
  const showSaidasGraph = () => setShowGanhos(false); 

  return (
    <div className="dash_container">

      <p id="dash_titulo_container">Dashboard</p>

      <div className='first_container'>
        <div className='div_controle'>
          <div className="periodo-seletor">
            <div className="dataInput" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                Mês:
                <select
                  value={mes}
                  onChange={(e) => setMes(parseInt(e.target.value))}
                  style={{ padding: '5px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {Array.from({ length: 12 }, (_, index) => (
                    <option key={index} value={index}>{index + 1}</option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                Ano:
                <input
                  type="number"
                  value={ano}
                  onChange={(e) => setAno(parseInt(e.target.value))}
                  min="2000"
                  max={dataAtual.getFullYear()}
                  style={{ padding: '5px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </label>
            </div>
            <Button variant="warning" size='sm' onClick={handleBuscar}>
              Visualizar
            </Button>
          </div>

          <div className='MetricasTotais'>
            <Debitos mes={periodo.mes} ano={periodo.ano} dadosAtualizados={dadosAtualizados} className="componente_metricas" />
            <Ganhos mes={periodo.mes} ano={periodo.ano} dadosAtualizados={dadosAtualizados} />
            <Lucro mes={periodo.mes} ano={periodo.ano} dadosAtualizados={dadosAtualizados} />
            <MediaConsulta mes={periodo.mes} ano={periodo.ano} dadosAtualizados={dadosAtualizados} />
          </div>


        </div>

        <MyLineChart></MyLineChart>

      </div>

      <p id="dash_titulo_container">Fluxo por categoria</p>

      <div className="secondSection">


        <div className="divListagem">
          <ListaFluxo></ListaFluxo>

          <div className='Add_Container'>
            <div className="addButtons">
              <ModalAddGanhos></ModalAddGanhos>
              <ModalAddGastos></ModalAddGastos>
            </div>
          </div>
        </div>

      </div>

      <p id="dash_titulo_container">Fluxo de consultas</p>

      <div className="thirdSection">
        <div className="consultasMetricas">
          <p>Faturamento por consultas:</p>
          <li>
             <FcCurrencyExchange style={{ fontSize: '36px' }}/>
            
             <h3>234,00</h3>
          </li>
          <li><FcBarChart style={{ fontSize: '36px' }}/>Consultas Realizadas: 6</li>

          <p>Clientes:</p>
          <li><FcOk style={{ fontSize: '36px' }}/><p>Ativos: 23</p></li>
          <li><FcCancel style={{ fontSize: '36px' }}/>Inativos: 67</li>

        </div>
        <div className="barras">
          <MyBarChart />
          <div className='footerBarras'>
            <p>Adicionais</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
