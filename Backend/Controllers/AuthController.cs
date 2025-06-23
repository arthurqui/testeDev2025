using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        /// <summary>
        /// Endpoint para cadastro de novo usuário.
        /// Verifica se o email já está cadastrado, salva o usuário no banco e retorna Ok.
        /// </summary>
        [HttpPost("register")]
        public IActionResult Register([FromBody] Usuario usuario)
        {
            // Verifica se já existe um usuário com o mesmo email
            if (_context.Usuarios.Any(u => u.Email == usuario.Email))
                return BadRequest("Email já cadastrado.");
            // Adiciona o novo usuário ao banco
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
            return Ok();
        }

        /// <summary>
        /// Endpoint de login.
        /// Recebe email e senha, valida no banco e retorna um token JWT se estiver correto.
        /// </summary>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest login)
        {
            // Busca o usuário pelo email e senha
            var usuario = _context.Usuarios.FirstOrDefault(u => u.Email == login.Email && u.Senha == login.Senha);
            if (usuario == null)
                return Unauthorized(); // Retorna 401 se não encontrar
            // Gera o token JWT para autenticação
            var token = GenerateJwtToken(usuario);
            return Ok(new { token });
        }

        /// <summary>
        /// Gera um token JWT para o usuário autenticado.
        /// </summary>
        private string GenerateJwtToken(Usuario usuario)
        {
            var key = Encoding.ASCII.GetBytes(_config["SECRET_KEY"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, usuario.Email) }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
} 