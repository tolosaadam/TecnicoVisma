using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TecnicoVisma.Entities.DTOS;
using Microsoft.AspNetCore.Authorization;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;

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
                string base64String;
                IImageFormat format;

                using (var image = SixLabors.ImageSharp.Image.Load(folderName, out format))
                {
                    using (var ms = new MemoryStream())
                    {                        
                        image.Save(ms, format);
                        image.Dispose();
                        byte[] imageBytes = ms.ToArray();
                        base64String = Convert.ToBase64String(imageBytes);
                        imageBytes = null;
                        ms.Dispose();
                    }
                }
                var completeImageBase64 = $"data:image/{format.Name.ToLower()};base64," + base64String;
                
                response.Data = completeImageBase64;        
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
