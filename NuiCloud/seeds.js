var mongoose    = require("mongoose");
var widget      = require("./models/widget");
 
var data = [
    {
        name: "YouTube",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABUCAMAAAC4PVVRAAAAt1BMVEXu8/r/AAAAAAAoKCj4/f/////0+f/x9v32+/9oamofHx8dHRzs//9tb3EGAwCxtrnh5uxjZWXFyc8TExJ6fH7M0NQYGBemqq4MCwgtLC2SlZb/u7vt+P/Z3eTp7vIkJCPw5uvyz9RISEr9R0n+LzG7vsLw7fT6aGw4OTr9PkD3lpr5gob8XV7/mpr1sLH6d3nzwsb/VFT/5eXw2+D/qKj/JCT/FhX4jZBRUlSIi4//2tr/zs7+8vKhuiRkAAAE2UlEQVRoge2YC3ObOBDHFUlIBIjB5mmXR+KE1Endq1Onjbm77/+5bhewTYzI4DRzvbnRfyYxDwn9WK12FxGipaWlpaWlpaWlpaWlpfW/k+zot7OkTiNyf319vb1BbeHonrQ30t+C6Fw/f1k//LwY0N3Tt8cb50PIpBBidOP08xBRRz+2ad3YA5GTo97oXkd55wbfUUpnI9/QuR2BBdri80QAT16YMPYMDmyufCIv6FFBpw2/tNhYrvR5HNbFk0NqHGZNYSixiFiEgCquZcH2sqtOm3O4nIeRXI3B8ogVczgQMIQfqofgDOxkAVTyK/Yai3WxQQ8TU4vZmSQSxo3U5iIyyzIP2iUxHnQwzuCS29Fcj8hlxglLXCEzyuwrtXvVMZBf2Wzimq9j4Blc6WY017fawQAoqrgAPN+FEaTJuZB7Gnn4abgEkd2rLRf02UeLuruS64/T4V+G1ufaqXusimLJRWCzxAOzlFUQLDw0nDcDAUI5m5UHLhnCxUxKvBnKhovPgiCuYZrusafwh/5y/GR8UnPd1lwmEBW5WAKdIfM5jWw7ohUnMgQnT2A4DA5eO4+CX8FZZYoYfna85goDatt0KtD2Fnb3adx3iPSxz2UYX1VcD3VkFSWFhUjg38LkK4sV1GeMulKGE8bmMFoEp0euIMKGOO0QXpDL2tEJhBFagmmhe1R3z3o+l76ouIy/FTmg4SI5eFYcIpwJiMXKiycQOoyxXGwSz1YFiwIuXHDVIF8k4LC9mXS+KLkM489eXLu7b1x1atlB7DNb4JT6rmkwJBEjufwF59C7WJriCsyVCZLASW8inZ5hWi6j52Z3TQ9z4Re7yrYvOTgZm4A3Q6ialOZILlyPM7SzJLuCFbB2wHqsb6/1IJdhvF6Ze3tBpJivwFACYyu4Bof39uNzuOAJxTzPMU/lUsLbRT2/f8Nef/1Q2ouQOaY/H3yVHrggVZ7HxeZeDh7PoPRRcw351/enAf8i6BcwD+ASXS5+Bpc3OXBlnqfkSge4epdhPbaLGdcRDvaKq3onF8Q1sL6CSxm/lLVPGyeg7EMurCU+gCtpqrQ+lyLenzpWqybeo+B5USY/ZB5LzF6YuE65evnxa2+Ftlq/yfVuv5emafZT97n1RJfr3XEixPhFclzXOZFlXPZrnzPqr+f0hAtXeNLEVVrW8Z6N4sIUC/G+jatiCv6lqHVGc21Oueo8FHMDM29eTw4V3PNPuezAMBb+nitxDQMvXnLsHoWQ/Iti3i8onLuxXFt5wiXhvZlVwij7aGZfxVbS5cLylhWLAMr9Q96uggSzt0CzWcsy8DGJj1iQA7o9mOvg93xlw0qHPwpRgy9hUMv346jDJbMEG9NqWrRc8x1+khQWfFeKJbwRdC+op6itxxrsaK669EMuSZY0iXxKS17nTerTSRY2dSF6DdTRvKK+Ty+xPoS6EC6uyJQmCS3xGzTf0cRPKAuVpXTeyzgq3RzN1fnU5pkbx7NmnUvpxiWH6ORl7Td3XreI44zLHE5lfVFCHzc3D93dzBj4EnFuHj/fDm5PQGJcv2zSDhbp7PVIKcThsVK0nxjk+EPaBvuLnTtN9ze2jdr9HNzN2da7OZsN7ujglg5p9nPSwb7/ivYbX+l/ZQdMS0tLS0tLS0tLS0tLS0vrQ/QPah59GUkVAQQAAAAASUVORK5CYII=",
        description: "A video description is a piece of metadata that helps YouTube understand the content of a video. Descriptions that are well optimized can lead to higher rankings in YouTube search. Along with your video title and tags, YouTube uses your description to understand the content (and context) of your video content.",
        url: "https://www.youtube.com/"
    },
    {
        name: "Instagram",
        image: "data:image/jpeg;base64,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",
        description: "Your Instagram profile creates the first impression of your brand and is the backbone of your Instagram presence. At the heart of your Instagram profile is your Instagram bio. It offers 150 characters of prime real estate to introduce yourself and show new visitors why they should follow and engage with your brand.",
        url: "https://www.instagram.com/"
    }
]
 
function seedDB(){
    //Remove all widgets
    widget.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed All Widgets");
        // add widgets
        data.forEach(function(seed){
            widget.create(seed, function(err, data){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added a Widget");
                }
            });
        });
    });
}
 
module.exports = seedDB;