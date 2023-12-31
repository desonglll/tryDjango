from django.contrib import admin
from django.urls import path
from pages.views import home_view, about_view, contact_view, list_view
from products.views import product_detail_view, product_create_view
from products.views import get

urlpatterns = [
    path("admin/", admin.site.urls),
    path("about/", about_view),
    path("product/", product_detail_view, name="product_detail"),
    path("create/", product_create_view, name="product_create"),
    path("list/", list_view, name="list"),
    path("contact/", contact_view, name="contact"),
    path('api/all_product/', get, name='api_get'),
    path("", home_view, name="home"),
]
