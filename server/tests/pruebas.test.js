import sinon from 'sinon';
import { expect } from 'chai';
import { Usuario } from '../classes/Usuario.js';



describe('Usuario', () => {
  let usuario;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    usuario = new Usuario({
      documento: '123456789',
      tipo_documento: 'DNI',
      primer_nombre: 'John',
      segundo_nombre: 'Doe',
      primer_apellido: 'Smith',
      segundo_apellido: 'Johnson',
      correo_electronico: 'john.doe@example.com',
      telefono: '123456789',
      rol: 'user',
      clave: 'mypassword',
      bloqueo: 0
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

   beforeEach(() => {
    usuario = new Usuario({
      documento: '123456789',
      tipo_documento: 'DNI',
      primer_nombre: 'John',
      // ... otros campos ...
    });
  });

  describe('buscarTodos', () => {
    it('debería devolver una lista de usuarios', async () => {
      // Realiza la llamada a la función y verifica el resultado
      const result = await Usuario.buscarTodos();
      expect(result).to.be.an('array');
    });
  });

  describe('buscar', () => {
    it('debería buscar un usuario por documento', async () => {
      const result = await usuario.buscar();
      expect(result).to.be.true;
      expect(usuario.documento).to.equal('123456789');
      // ... verifica otros campos ...
    });
  });

  describe('buscarTodos', () => {
    it('debería devolver una lista de usuarios', async () => {
      const mockQuery = sandbox.stub().resolves({ result: [{ /* mock data */ }] });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await Usuario.buscarTodos();
      expect(result).to.be.an('array');
    });
  });

  describe('buscar', () => {
    it('debería buscar un usuario por documento', async () => {
      const mockQuery = sandbox.stub().resolves({ result: [{ /* mock data */ }] });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.buscar();
      expect(result).to.be.true;
      expect(usuario.documento).to.equal('123456789');
      // Verifica otros campos
    });
  });  

  describe('insertar', () => {
    it('debería insertar un usuario', async () => {
      const mockQuery = sandbox.stub().resolves({ affectedRows: 1 });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.insertar();
      expect(result).to.be.true;
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un usuario por documento', async () => {
      const mockQuery = sandbox.stub().resolves({ affectedRows: 1 });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.actualizar('123456789');
      expect(result).to.be.true;
    });
  });

  describe('actualizarDocumento', () => {
    it('debería actualizar el documento de un usuario', async () => {
      const mockQuery = sandbox.stub().resolves({ affectedRows: 1 });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.actualizarDocumento('new-document');
      expect(result).to.be.true;
    });
  });

  describe('actualizarPersonales', () => {
    it('debería actualizar la información personal de un usuario', async () => {
      const mockQuery = sandbox.stub().resolves({ affectedRows: 1 });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.actualizarPersonales('123456789');
      expect(result).to.be.true;
    });
  });

  describe('actualizarClave', () => {
    it('debería actualizar la clave de un usuario', async () => {
      const mockQuery = sandbox.stub().resolves({ affectedRows: 1 });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.actualizarClave('123456789');
      expect(result).to.be.true;
    });
  });

  describe('verificarNumeroDocumento', () => {
    it('debería verificar si el número de documento existe', async () => {
      const mockQuery = sandbox.stub().resolves({ result: [{ num: 1 }] });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.verificarNumeroDocumento();
      expect(result).to.be.true;
    });
  });

  describe('verificarCorreoElectronico', () => {
    it('debería verificar si el correo electrónico existe', async () => {
      const mockQuery = sandbox.stub().resolves({ result: [{ num: 1 }] });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.verificarCorreoElectronico();
      expect(result).to.be.true;
    });
  });

  describe('verificarDocumento', () => {
    it('debería verificar si el documento y tipo de documento existen', async () => {
      const mockQuery = sandbox.stub().resolves({ result: [{ num: 1 }] });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.verificarDocumento();
      expect(result).to.be.true;
    });
  });

  describe('verificarClave', () => {
    it('debería verificar si la clave del usuario es correcta', async () => {
      const mockQuery = sandbox.stub().resolves({ result: [{ num: 1 }] });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.verificarClave();
      expect(result).to.be.true;
    });
  });

  describe('verificarBloqueo', () => {
    it('debería verificar si el usuario está bloqueado', async () => {
      const mockQuery = sandbox.stub().resolves({ result: [{ bloqueo: 0 }] });
      sandbox.stub(usuario, 'Pool').value({ query: mockQuery });

      const result = await usuario.verificarBloqueo();
      expect(result).to.be.false;
    });
  });

  describe('verificar', () => {
    it('debería verificar el documento, clave y bloqueo del usuario', async () => {
      const mockQueryDocumento = sandbox.stub().resolves({ result: [{ num: 1 }] });
      const mockQueryClave = sandbox.stub().resolves({ result: [{ num: 1 }] });
      const mockQueryBloqueo = sandbox.stub().resolves({ result: [{ bloqueo: 0 }] });
      sandbox.stub(usuario, 'verificarDocumento').resolves(true);
      sandbox.stub(usuario, 'verificarClave').resolves(true);
      sandbox.stub(usuario, 'verificarBloqueo').resolves(false);

      const result = await usuario.verificar();
      expect(result).to.deep.equal([true, true, false]);
    });
  });
});