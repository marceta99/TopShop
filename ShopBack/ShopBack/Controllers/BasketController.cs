using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopBack.Data;
using ShopBack.DTOS;
using ShopBack.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext context;

        public BasketController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);

            if (basket == null) return NotFound();

            return MapBasketToDto(basket); 
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            var basket = await context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);

            if (basket == null) basket = CreateBasket();

            var product = await context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, quantity);

            var result = await context.SaveChangesAsync(); //this method returns int number of chages that it made toa  databse 

            if (result > 0) return CreatedAtRoute("GetBasket", MapBasketToDto(basket)); 

            return BadRequest("Problem with saving item to basket");
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString(); //generate random buyer id
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            context.Baskets.Add(basket);

            return basket; 
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity) 
        {
            var basket = await context.Baskets
               .Include(i => i.Items)
               .ThenInclude(p => p.Product)
               .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);

            if (basket == null) return NotFound(); 

            basket.RemoveItem(productId, quantity);
            var result = await context.SaveChangesAsync();

            if (result > 0) return Ok();

            return BadRequest("Problem with deleting basket"); 
        }


        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemsDto
                {
                    ProductId = item.Product.Id,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }





    }
}
