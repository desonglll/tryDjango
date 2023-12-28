from django.contrib import admin

from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ('title',)  # 在列表中显示的字段


admin.site.register(Product)
# Register your models here.
