from django.shortcuts import render
from django.http import HttpResponse
from products.views import Product


# Create your views here.


# Create your views here.
def home_view(request, *args, **kwargs):  # *args, **kwargs
    return render(request, "home.html", {})


def about_view(request, *args, **kwargs):  # *args, **kwargs
    my_context = {
        "my_name": "mikeshinoda",
        "my_age": 20,
        "my_description": "Whatever else",
        "my_email": "lindesong666@gmail.com",
        "my_list": [1, 22, 333, 4444],
    }
    return render(request, "about.html", my_context)


def list_view(request, *args, **kwargs):  # *args, **kwargs
    products = Product.objects.all()
    context = {
        'obj': products
    }
    return render(request, "list.html", context)


def contact_view(request, *args, **kwargs):  # *args, **kwargs
    return render(request, "contact.html", {})
