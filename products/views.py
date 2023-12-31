from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.shortcuts import render
from .models import Product
from .forms import ProductForm


def print_all_product_id():
    models = Product.objects.all()
    for obj in models:
        print(obj.id)


def product_create_view(request):
    form = ProductForm(request.POST or None)
    if form.is_valid():
        form.save()
        form = ProductForm()  # rerender form to empty

    context = {'form': form}
    return render(request, "products/product_create.html", context)


# Create your views here.
def product_detail_view(request):
    product_id = request.GET.get('id', None)
    if product_id is None or not product_id.isdigit():
        print("product_id is None or not product_id.isdigit")
        return HttpResponseRedirect('/')
    if Product.objects.all().filter(id=product_id).exists():
        print(product_id, "is in the list of products")
    else:
        print(product_id, "is not in the list of products")
        return HttpResponseRedirect('/')
    obj = Product.objects.get(id=product_id)
    # context = {
    #     'title': obj.title,
    #     'description': obj.description,
    # }
    context = {'obj': obj}
    return render(request, "product/detail.html", context)


def get(request):
    # 获取数据的逻辑
    items = Product.objects.all()
    data = []
    for i in items:
        print(i.id, i.title, i.description, i.price)
        dict_item = {
            'id': i.id,
            'title': i.title,
            'description': i.description,
            'featured': i.featured,
            "summary": i.summary,
            "released_date": i.released_date,
            'price': i.price
        }
        data.append(dict_item)
    return JsonResponse(data, safe=False)
