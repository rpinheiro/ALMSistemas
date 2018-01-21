using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ALMSistemas.Models;
using ALMSistemas.Models.Context;

namespace ALMSistemas.Controllers
{
    public class UsuarioController : Controller
    {
        private ALMContext _context = null;

        public UsuarioController()
        {
            _context = new ALMContext();
        }

        public JsonResult GetUsuarios()
        {
            List<Usuario> listaUsuarios = _context.Usuarios.ToList();
            return Json(new { listaUsuarios = listaUsuarios }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUsuario(int id)
        {
            Usuario usuario = _context.Usuarios.Where(u => u.Id == id).SingleOrDefault();
            return Json(new { usuario = usuario }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddUsuario(Usuario usuario)
        {
            if (usuario.Id == 0)
                _context.Usuarios.Add(usuario);
            else
            {
                _context.Entry(usuario).State = System.Data.Entity.EntityState.Modified;
            }

            _context.SaveChanges();
            return Json(new { mensagem = "Usuário cadastrado com sucesso." });
        }     

        public JsonResult DeleteUsuario(int? id)
        {
            Usuario usuario = _context.Usuarios.Where(u => u.Id == id).SingleOrDefault();
            _context.Usuarios.Remove(usuario);
            _context.SaveChanges();
            return Json(new { mensagem = "Usuário removido com sucesso." });
        }
    }
}
