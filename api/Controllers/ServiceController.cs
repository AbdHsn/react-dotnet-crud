using DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Entities;

[Route("api/[controller]")]
[ApiController]
public class ServiceController : ControllerBase
{
    private readonly TestDBContext _context;

    public ServiceController(TestDBContext context)
    {
        _context = context;
    }

    // GET: api/Services
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Service>>> GetServices()
    {
        return await _context.Service.ToListAsync();
    }

    // GET: api/Services/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Service>> GetService(int id)
    {
        var service = await _context.Service.FindAsync(id);

        if (service == null)
        {
            return NotFound();
        }

        return service;
    }

    // POST: api/Services
    [HttpPost]
    public async Task<ActionResult<Service>> PostService(Service service)
    {
        _context.Service.Add(service);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetService", new { id = service.ServiceId }, service);
    }

    // PUT: api/Services/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutService(int id, Service service)
    {
        if (id != service.ServiceId)
        {
            return BadRequest();
        }

        _context.Entry(service).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Service.Any(e => e.ServiceId == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Services/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        var service = await _context.Service.FindAsync(id);
        if (service == null)
        {
            return NotFound();
        }

        _context.Service.Remove(service);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
