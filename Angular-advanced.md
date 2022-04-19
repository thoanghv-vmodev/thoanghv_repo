# ROUTING AND NAVIGATION

- AppModule được coi là 1 root và chứa các module con, để navigation đến các module và các component con thì sử dụng
  Angular routing.
- Define routers dùng cặp ngoặc { path: 'name', component: name-component} - đối với component.
  { path: 'name', loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule)} - đối với
  module children

- Thêm routers vào view:

# routerLink:

<a routerLink="/path" routerLinkActive="active"></a>
<a [routerLink]="['path', id]" routerLinkActive="active"></a>

- routerLinkActive là phần Css để biết link đang được sử dụng
- dùng RouterModule

# LazyLoad:

- Không load module các không cần thiết
- load nội dung mới mà không cần phải reload

vd: {
path: 'product-list',
loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule)
}

- PreloadAllModules tải trước các module khi rảnh(khi tải xong module cần sử dụng), việc này sẽ giúp user ko tốn tgian đợi load tiếp module khi navigation

# Route parameters:

- truyền tham số để render dữ liệu theo tham số truyền vào

# Routing guard:

- Dùng để chặn người dùng khi chưa đủ điều kiện để redirect qua page khác.

- CanActivate: Quyết định việc một route được kích hoạt.

- CanActivateChild: Quyết định việc một children route được kích hoạt.

- CanDeactivate: Quyết định một route hủy kích hoạt.

- CanLoad: Quyết định một module được lazy loading

- Resolve: Lấy data trước khi điều hướng tới route.

# ANGULAR (Service)

- Angular service luôn là Singleton.

# Dependency là: Sự phụ thuộc

- Khi trong class A có sự tồn tại của class B, dùng class B để làm một công việc nào đó, ta nói rằng class A đang phụ thuộc vào class B.

# Dependency injection:

- Dependency Injection là một phần quan trọng trong bộ core của Angular. Sử dụng cơ chế Dependency Injection giúp chúng ta có thể
  nhúng service vào các component hoặc các service với nhau.

# Singleton:

- Đảm bảo duy nhất một object được sinh ra trong toàn bộ hệ thống. Tức là giới hạn việc khởi tạo một class đối với một object.

# Angular (HttpClient)
