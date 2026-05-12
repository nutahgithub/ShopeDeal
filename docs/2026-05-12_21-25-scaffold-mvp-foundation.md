# Plan: Scaffold MVP Foundation

Thoi gian tao plan: 2026-05-12 21:25

## 0. Language convention

- Trao doi voi user bang tieng Viet.
- Tat ca noi dung lien quan den code dung tieng Anh, bao gom file name, folder name, component name, function name, variable name, type, interface, model, field, enum, route, code comments va code samples.

## 1. Muc tieu

Khoi tao nen tang dau tien cho du an ShopeDeal theo stack da chot:

- Next.js
- TypeScript
- Tailwind CSS
- MySQL
- Node.js
- Prisma
- Redis
- BullMQ

Muc tieu cua lan implement nay la tao bo khung chuan de cac chuc nang sau co the phat trien theo cung mot pattern, khong don business logic vao UI hoac API route.

## 2. Pham vi implement

Lan implement nay se lam cac phan sau:

1. Scaffold project Next.js.
2. Cau hinh TypeScript, Tailwind CSS, ESLint/format co ban.
3. Tao `.env.example`.
4. Tao Prisma schema MVP voi cac bang loi.
5. Tao cau truc service layer.
6. Tao mock Shopee provider.
7. Tao UI foundation co ban.

Chua implement:

- Dang nhap nguoi dung hoan chinh.
- Ket noi Shopee API that.
- Ket noi thanh toan.
- Tu dong mua hang/checkout.
- AI review summary.
- Chrome extension.
- Dashboard seller.

## 3. Scaffold project

Du kien khoi tao Next.js app voi:

- App Router.
- TypeScript.
- Tailwind CSS.
- ESLint.
- Thu muc `src/`.

Neu dung CLI, lenh du kien:

```txt
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Sau khi scaffold, can kiem tra va dieu chinh:

- `package.json`
- `tsconfig.json`
- `next.config.ts` hoac `next.config.mjs`
- `postcss.config.*`
- `eslint.config.*` hoac `.eslintrc.*`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

## 4. Dependencies du kien

Dependencies chinh:

```txt
@prisma/client
prisma
mysql2
ioredis
bullmq
zod
clsx
tailwind-merge
lucide-react
```

Co the them sau neu can:

```txt
next-auth
@auth/prisma-adapter
vitest
playwright
```

Giai doan nay chua can cai auth neu chua implement user login.

## 5. Cau hinh moi truong

Tao file `.env.example` voi cac bien:

```txt
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/shopedeal"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
SHOPEE_AFFILIATE_ID=""
SHOPEE_AFFILIATE_BASE_URL=""
OPENAI_API_KEY=""
```

Ghi chu:

- `.env` that khong commit.
- Neu chua co MySQL/Redis local, van co the code voi schema va mock data truoc.
- `OPENAI_API_KEY` de san cho AI summary o giai doan sau, chua dung trong foundation.

## 6. Database MVP voi Prisma

Tao `prisma/schema.prisma` dung MySQL.

Model MVP:

- `User`
- `Shop`
- `Product`
- `PriceHistory`
- `WatchlistItem`
- `PriceAlert`
- `AffiliateClick`
- `SaleEvent`

Enum du kien:

- `PriceAlertStatus`: `ACTIVE`, `TRIGGERED`, `PAUSED`, `CANCELLED`
- `SaleEventStatus`: `DRAFT`, `SCHEDULED`, `ACTIVE`, `ENDED`

Quan he chinh:

- `Shop` co nhieu `Product`.
- `Product` co nhieu `PriceHistory`.
- `User` co nhieu `WatchlistItem`.
- `User` co nhieu `PriceAlert`.
- `Product` co nhieu `WatchlistItem`.
- `Product` co nhieu `PriceAlert`.
- `Product` co nhieu `AffiliateClick`.

Field can co:

- `id`
- `createdAt`
- `updatedAt` neu phu hop
- `externalId` / `shopeeItemId` de sau nay map du lieu that
- `productUrl`
- `affiliateUrl`
- `currentPrice`
- `rating`
- `soldCount`

## 7. Cau truc thu muc se tao

```txt
src/
  app/
    api/
      products/
        route.ts
      affiliate-clicks/
        route.ts
    layout.tsx
    page.tsx
    globals.css
  components/
    ui/
      button.tsx
      input.tsx
      badge.tsx
    layout/
      app-shell.tsx
    product/
      product-card.tsx
      product-search-form.tsx
    deal/
      deal-score-badge.tsx
  lib/
    prisma.ts
    redis.ts
    env.ts
    utils.ts
  server/
    services/
      product-service.ts
      deal-score-service.ts
      affiliate-service.ts
      marketplace/
        shopee-provider.ts
        mock-shopee-provider.ts
    repositories/
      product-repository.ts
      affiliate-click-repository.ts
    queues/
      redis-connection.ts
    jobs/
  types/
    product.ts
    deal.ts
```

## 8. Service layer pattern

Pattern bat buoc:

```txt
Route Handler / Server Component
  -> Service
  -> Repository
  -> Prisma
```

Vi du search product:

```txt
src/app/api/products/route.ts
  -> src/server/services/product-service.ts
  -> src/server/services/marketplace/mock-shopee-provider.ts
  -> src/server/repositories/product-repository.ts
  -> Prisma
```

Route handler chi parse request, validate input, goi service va tra response.

## 9. Mock Shopee provider

Tao interface:

```txt
ShopeeProvider
```

Provider can co method ban dau:

- `searchProducts(query)`
- `getProductById(productId)`

Mock provider tra ve sample data gom:

- `name`
- `imageUrl`
- `currentPrice`
- `originalPrice`
- `rating`
- `soldCount`
- `shop`
- `voucherLabel`
- `productUrl`

Muc tieu:

- UI va service co the chay ngay.
- Sau nay thay `mock-shopee-provider` bang provider that ma khong phai sua UI.

## 10. Deal score

Tao service rieng:

```txt
src/server/services/deal-score-service.ts
```

Ban dau tinh score bang cong thuc don gian:

- Lower `currentPrice` compared with `originalPrice` or reference price increases the score.
- Higher `rating` increases the score.
- Higher `soldCount` increases the score.
- Available `voucherLabel` increases the score.
- Clamp score from `0` to `100`.

UI chi hien thi ket qua, khong chua cong thuc tinh diem.

## 11. UI foundation

Tao cac component co ban:

- `Button`
- `Input`
- `Badge`
- `AppShell`
- `ProductSearchForm`
- `ProductCard`
- `DealScoreBadge`

Trang home MVP:

- Header don gian voi ten ShopeDeal.
- Search form o vi tri trung tam/man hinh dau.
- Danh sach product card hien ket qua mock.
- Moi card co:
  - `imageUrl`
  - `name`
  - `currentPrice`
  - `rating`
  - `soldCount`
  - `shop`
  - `DealScoreBadge`
  - `Buy on Shopee` button

Style:

- Gon, ro, uu tien kha nang scan.
- Khong lam landing page dai.
- Khong dung qua nhieu gradient.
- Component co kich thuoc on dinh, khong de text tran khoi button/card.

## 12. Affiliate click mock

Tao API route:

```txt
src/app/api/affiliate-clicks/route.ts
```

Chuc nang:

- Nhan `productId` / `productUrl`.
- Goi affiliate service.
- Luu click neu database san sang.
- Tra ve mock redirect URL.

Giai doan dau co the:

- Neu database chua connect, log server hoac tra mock URL.
- Sau khi Prisma/MySQL san sang, luu vao `AffiliateClick`.

## 13. Kiem tra sau implement

Can chay:

```txt
npm run lint
npm run build
```

Neu co Prisma:

```txt
npx prisma validate
```

Neu chua co MySQL local:

- Khong chay migration bat buoc.
- Chi validate schema neu co the.
- Ghi ro trong final response phan nao chua verify duoc do thieu database.

## 14. Thu tu implement de xuat

1. Scaffold Next.js project.
2. Cai dependencies can thiet.
3. Tao `.env.example`.
4. Tao Prisma schema.
5. Tao `src/lib/env.ts`, `src/lib/prisma.ts`, `src/lib/redis.ts`.
6. Tao folder service/repository/provider.
7. Implement mock Shopee provider.
8. Implement deal score service.
9. Tao UI foundation.
10. Tao home page search mock.
11. Tao API route product search va affiliate click mock.
12. Chay lint/build/Prisma validate.

## 15. Dieu kien hoan thanh

Lan implement nay duoc xem la xong khi:

- Project Next.js chay duoc.
- Co `.env.example`.
- Co Prisma schema MVP dung MySQL.
- Co service/repository/provider structure.
- Co mock Shopee provider.
- Trang home co search form va product cards tu mock data.
- Co deal score hien thi tren UI.
- Co affiliate click mock.
- Lint/build khong loi, hoac neu co loi do thieu moi truong thi ghi ro.

## 16. Ghi chu cho cac lan sau

Sau khi plan nay duoc duyet va implement xong, cac chuc nang tiep theo nen co plan rieng truoc khi code, vi du:

- `YYYY-MM-DD_HH-mm-product-search.md`
- `YYYY-MM-DD_HH-mm-watchlist.md`
- `YYYY-MM-DD_HH-mm-price-alert.md`
- `YYYY-MM-DD_HH-mm-affiliate-tracking.md`
