import './Pagina.css'
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>Zapatos Kevin</h3>
            <p><h4>Las mejores marcas de zapatos online en Ecuador</h4>
              Compra zapatos de tus marcas preferidas directamentamente desde Amazon, sin impuestos de importación, sin casillero , sin trámites de aduana y directamente a tu casa.

              También podrás diferir tus compras con tus tarjetas de crédito favoritas sin intereses.</p>
          </div>

          <div className="col-md-3">
            <h3>Contacto</h3>
            <p>Dirección: 123 Main St, Ciudad, País</p>
            <p>Teléfono: 555-555-5555</p>
            <p>Email: info@nombredelasite.com</p>
          </div>

        </div>
      </div>
      <div className="copyright">
        Copyright &copy; 2021 Zapatos Kevin
      </div>
    </footer>



  );
}