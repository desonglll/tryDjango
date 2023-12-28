from django.db import models


# Create your models here.


class Product(models.Model):
    # Map to the database
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10000, decimal_places=2)
    summary = models.TextField(default="This is cool")
    featured = models.BooleanField(default=True)
    released_date = models.DateField(null=True, blank=True)
