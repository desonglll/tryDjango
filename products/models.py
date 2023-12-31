from django.db import models


class Product(models.Model):
    # Map to the database
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True, default="Description comming soon...orz")
    price = models.DecimalField(max_digits=10000, decimal_places=2)
    summary = models.TextField(default="This product is awesome!!! owo")
    featured = models.BooleanField(default=True)
    released_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title
