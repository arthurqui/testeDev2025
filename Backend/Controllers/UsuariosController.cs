using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Endpoint protegido que retorna a lista de todos os usuários cadastrados.
        /// Só pode ser acessado por quem está autenticado (JWT).
        /// </summary>
        [HttpGet]
        [Authorize]
        public IActionResult GetUsuarios()
        {
            // Busca todos os usuários no banco e retorna apenas Id, Nome e Email
            var usuarios = _context.Usuarios.Select(u => new { u.Id, u.Nome, u.Email }).ToList();
            return Ok(usuarios);
        }
    }
} 