using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TecnicoVisma.Entities.DTOS;
using System.Drawing;
using Microsoft.AspNetCore.Authorization;

namespace TecnicoVismaAPI.Controllers
{
    [OpenApiTag("Document",
               Description = "Document Controller")]
    [Route("api/document")]
    [SwaggerResponse(204, typeof(void))]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly ILogger<DocumentController> _logger;

        public DocumentController(ILogger<DocumentController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        [HttpGet("getFile/{pathFile}"), DisableRequestSizeLimit] 
        public IActionResult GetFile(string pathFile) 
        {
            _logger.LogInformation($"GetFile from Controller");
            var response = new ResponseDTO<string>();
            try
            {
                var folderName = Path.Combine("Resources", "Images", pathFile);

                using (Image image = Image.FromFile(folderName))
                {
                    using (MemoryStream m = new())
                    {
                        image.Save(m, image.RawFormat);
                        byte[] imageBytes = m.ToArray();

                        // Convert byte[] to Base64 String
                        string base64String = Convert.ToBase64String(imageBytes);
                      
                        var completeImageBase64 = $"data:image/{image.RawFormat.ToString().ToLower()};base64," + base64String;
                        response.Data = completeImageBase64;
                    }
                }
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Gatting a file  = {pathFile}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);
            }
        }
      

        [HttpPost("addFile"), DisableRequestSizeLimit]
        public IActionResult AddFile()
        {
            var response = new ResponseDTO<string>();
            try
            {
                var file = Request.Form.Files[0];
                var foldername = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), foldername);

              
                
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                response.Data = fileName;
                return Ok(response);
                


            }
            catch(Exception e)
            {

                response.ErrorMessage = e.Message;
                return BadRequest(response);
            }
        }

    }
}
