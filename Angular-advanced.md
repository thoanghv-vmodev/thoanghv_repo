# Routing and navigation

- AppModule được coi là 1 root và chứa các module con, để navigation đến các module và các component con thì sử dụng
  Angular routing.
- Define routers dùng cặp ngoặc { path: 'name', component: name-component} - đối với component.
  { path: 'name', loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule)} - đối với
  module children

- Thêm routers vào view:

* bằng routerLink:
  <a routerLink="/path" routerLinkActive="active"></a>
  - routerLinkActive là phần Css để biết link đang được sử dụng
* bằng
