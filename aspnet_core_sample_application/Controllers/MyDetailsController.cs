using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationBasic.Controllers
{
    [Produces("application/json")]
    [Route("api/MyDetails")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class MyDetailsController : Controller
    {
        private EntityModelContext _context = null;
        public MyDetailsController(EntityModelContext context)
        {
            _context = context;
        }
        [HttpGet("[action]")]
        public List<MyDetails> GetData()
        {
            List<MyDetails> data = null;
            data = _context.MyDetails.ToList();
            return data;
        }

        [HttpGet]
        [Route("GetDetails/{id?}")]
        public MyDetails GetDetails(int? id)
        {
            MyDetails data = new MyDetails();
            if (id.HasValue)
            {
                data = _context.MyDetails.Where(p => p.Id == id.Value).FirstOrDefault();
                if (data == null)
                {
                    data = new MyDetails();
                }
            }
            return data;
        }

        [HttpPost("[action]")]
        public IActionResult Save([FromBody] MyDetails myDetail)
        {
            bool isNew = false;
            MyDetails data = _context.MyDetails.Where(p => p.Id == myDetail.Id).FirstOrDefault();
            if (data == null)
            {
                data = new MyDetails();
                isNew = true;
            }
            data.FirstName = myDetail.FirstName;
            data.LastName = myDetail.LastName;
            data.AdharNumber = myDetail.AdharNumber;
            data.Email = myDetail.Email;
            data.PhoneNumber = myDetail.PhoneNumber;
            if (isNew)
            {
                _context.Add(data);
            }
            _context.SaveChanges();
            return Ok(data);
        }

        [HttpDelete("[action]")]
        public IActionResult Delete([FromBody] int id)
        {
            MyDetails data = _context.Set<MyDetails>().FirstOrDefault(c => c.Id == id);
            _context.Entry(data).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            _context.SaveChanges();
            return Ok(true);
        }
    }
}