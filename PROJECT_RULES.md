# ShopeDeal - Quy uoc cong nghe va codebase

File nay la bo quy tac chung cho du an ShopeDeal. Khi implement tinh nang moi, can uu tien lam theo cac quy uoc trong file nay truoc khi de xuat huong khac.

## 1. Stack cong nghe da chot

- Framework: Next.js
- Language: TypeScript
- UI: React
- Styling: Tailwind CSS
- Runtime/backend: Node.js
- Database: MySQL
- ORM: Prisma
- Cache/Queue: Redis
- Background jobs: BullMQ

## 2. Dinh huong san pham

ShopeDeal la web app tro ly san deal Shopee, tap trung vao:

- Tim kiem va so sanh san pham.
- Cham diem deal.
- Tom tat danh gia bang AI o giai doan sau.
- Theo doi gia va thong bao.
- Goi y voucher/khuyen mai.
- Dan nguoi dung sang Shopee bang affiliate link.

Trong giai doan MVP, khong implement tu dong dat hang, tu dong dang nhap Shopee, tu dong thanh toan, hoac bat ky chuc nang nao can can thiep truc tiep vao tai khoan Shopee cua nguoi dung.

## 3. Nguyen tac implement

- Khi giao tiep voi user, uu tien dung tieng Viet.
- Tat ca noi dung lien quan den code phai dung tieng Anh, bao gom ten file, folder, component, function, variable, type, interface, model, field, enum, route, commit message, comment trong code va noi dung hien thi trong code sample.
- Uu tien code don gian, ro rang, de mo rong.
- Truoc khi implement moi chuc nang hoac nhom cong viec lon, tao file plan trong `docs/`.
- Ten file plan theo format `YYYY-MM-DD_HH-mm-feature-name.md`, vi du `2026-05-12_21-25-product-search.md`.
- File plan can mo ta muc tieu, pham vi, thu tu implement, files du kien thay doi, cach verify va dieu kien hoan thanh.
- Khong tao abstraction moi neu chua co nhu cau ro rang.
- Tach business logic khoi UI component neu logic co the tai su dung.
- Moi tinh nang moi nen co typing ro rang bang TypeScript.
- Khong dung `any` neu co the khai bao type/interface cu the.
- Khong hard-code secret, API key, token, database URL.
- Tat ca bien moi truong phai nam trong `.env` va co vi du trong `.env.example`.
- Code nen du de doc ma khong can comment qua nhieu. Chi comment khi logic kho hieu hoac co rui ro business.
- Khi chua co du lieu that tu Shopee, co the dung mock data co cau truc gan voi du lieu that.

## 4. Cau truc thu muc de xuat

Khi khoi tao Next.js app, uu tien cau truc:

```txt
src/
  app/
    (public)/
    (dashboard)/
    api/
  components/
    ui/
    layout/
    product/
    deal/
    voucher/
  lib/
    prisma.ts
    redis.ts
    auth.ts
    env.ts
  server/
    services/
    repositories/
    jobs/
    queues/
  types/
  utils/
  styles/
prisma/
  schema.prisma
  migrations/
docs/
```

Y nghia:

- `src/app`: routing, page, layout va API route cua Next.js.
- `src/components/ui`: component UI dung chung nhu Button, Input, Badge, Modal.
- `src/components/product`: component rieng cho san pham.
- `src/components/deal`: component lien quan den deal score, deal list.
- `src/components/voucher`: component lien quan voucher/khuyen mai.
- `src/lib`: singleton client, config, helper tich hop ha tang.
- `src/server/services`: business logic.
- `src/server/repositories`: logic truy van database qua Prisma.
- `src/server/jobs`: job handler.
- `src/server/queues`: queue definition va producer.
- `src/types`: type dung chung.
- `src/utils`: helper function thuan tuy.
- `docs`: tai lieu bo sung cua du an.

## 5. Quy uoc TypeScript

- Dung TypeScript strict mode.
- Dat ten type/interface ro nghia theo domain, vi du `ProductDeal`, `DealScore`, `PriceAlert`.
- Uu tien `type` cho data shape va union, `interface` cho object co kha nang extend.
- Khong dat ten bien viet tat kho hieu.
- Function nen co input/output ro rang.
- Neu function co side effect, ten function can the hien hanh dong, vi du `sendPriceAlertEmail`, `enqueuePriceTrackingJob`.

## 6. Quy uoc React/Next.js

- Uu tien Server Components neu component chi hien thi du lieu.
- Chi dung Client Components khi can state, event handler, browser API hoac interactivity.
- Component nen nho, co trach nhiem ro.
- Data fetching nen nam o server layer khi co the.
- Khong goi truc tiep Prisma tu Client Component.
- API route chi nen lam lop entrypoint, business logic dat trong `src/server/services`.
- Form nen co validation ro rang.

## 7. Quy uoc UI va Tailwind CSS

- Giao dien nen gon, ro, de scan, phu hop voi cong cu san deal.
- Uu tien layout thuc dung hon landing page mau me.
- Dung Tailwind CSS class truc tiep trong component.
- Neu class qua dai/lap lai nhieu, tach thanh component hoac helper.
- Mau sac nen tao cam giac tin cay, mua sam, ro thong tin; tranh qua nhieu gradient.
- Button, input, badge, card nen duoc chuan hoa trong `components/ui`.
- Trang chinh cua app nen vao thang trai nghiem tim kiem/so sanh deal, khong can landing page dai trong MVP.

## 8. Database va Prisma

Database su dung MySQL.

Quy uoc:

- Prisma schema nam tai `prisma/schema.prisma`.
- Moi bang nen co `id`, `createdAt`, `updatedAt` neu phu hop.
- Dung enum cho cac trang thai co tap gia tri co dinh, vi du alert status, job status.
- Dat ten model so it theo domain, vi du `Product`, `Shop`, `Voucher`.
- Quan he can khai bao ro trong Prisma schema.
- Migration can co ten ro nghia.

Model nen co trong MVP:

- `User`
- `Product`
- `Shop`
- `ProductSnapshot`
- `PriceHistory`
- `Review`
- `ReviewSummary`
- `Voucher`
- `WatchlistItem`
- `PriceAlert`
- `AffiliateClick`
- `SaleEvent`

## 9. Redis va BullMQ

Redis duoc dung cho:

- Cache ket qua tim kiem.
- Cache thong tin san pham hot.
- Queue job nen voi BullMQ.

BullMQ duoc dung cho:

- Cap nhat gia san pham dinh ky.
- Kiem tra voucher moi.
- Gui thong bao gia.
- Xu ly tom tat review bang AI o giai doan sau.

Quy uoc:

- Queue definition nam trong `src/server/queues`.
- Job handler nam trong `src/server/jobs`.
- Ten queue va job can ro nghia, vi du `price-tracking`, `voucher-sync`, `review-summary`.
- Job nen idempotent neu co the, de retry khong tao du lieu trung lap.

## 10. Bien moi truong

Can tao `.env.example` khi bat dau scaffold du an.

Bien moi truong du kien:

```txt
DATABASE_URL=
REDIS_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
SHOPEE_AFFILIATE_ID=
SHOPEE_AFFILIATE_BASE_URL=
OPENAI_API_KEY=
```

Khong commit file `.env` that.

## 11. Authentication

Giai doan dau co the dung Auth.js/NextAuth.

Dang nhap du kien:

- Email magic link hoac credentials trong prototype.
- Google login o giai doan sau.

User can dang nhap khi:

- Tao watchlist.
- Dat price alert.
- Quan ly thong bao.
- Dung goi premium.

## 12. API va service layer

Quy uoc flow:

```txt
Route Handler / Server Action
  -> Service
  -> Repository
  -> Prisma
```

Vi du:

```txt
src/app/api/products/route.ts
  -> src/server/services/product-service.ts
  -> src/server/repositories/product-repository.ts
```

Route/API khong nen chua qua nhieu business logic.

## 13. Validation va error handling

- Uu tien dung Zod de validate input.
- Loi tra ve nguoi dung nen ngan gon, khong lo thong tin noi bo.
- Log loi ky thuat o server.
- Voi tac vu nen, can co retry va log that bai.
- Khong nuot loi am tham.

## 14. Testing

Giai doan dau co the toi thieu:

- Unit test cho deal scoring.
- Unit test cho voucher calculation.
- Integration test cho service quan trong.

Cong nghe co the dung:

- Vitest cho unit test.
- Playwright cho end-to-end test khi UI on dinh.

## 15. Deal scoring

Deal score la mot trong cac gia tri cot loi cua ShopeDeal.

Logic tinh diem nen tach rieng, vi du:

```txt
src/server/services/deal-score-service.ts
```

Diem co the dua tren:

- `currentPrice`.
- Gia trung binh/lich su.
- Rating.
- So luong review.
- So luot ban.
- Do uy tin shop.
- Voucher/freeship.
- Tin hieu rui ro.

Khong nen hard-code cong thuc trong UI.

## 16. Du lieu Shopee va affiliate

- Uu tien nguon du lieu hop le va co quyen su dung.
- Can tuan thu Shopee Open Platform, Shopee Affiliate va dieu khoan lien quan.
- Neu chua co API that, dung mock provider hoac adapter layer de sau nay thay the.
- Khong implement logic tu dong login, auto checkout, bypass captcha, bypass rate limit.

Adapter layer de xuat:

```txt
src/server/services/marketplace/
  shopee-provider.ts
  mock-shopee-provider.ts
```

## 17. Logging va analytics

Can tracking cac su kien quan trong:

- Search product.
- View product detail.
- Add to watchlist.
- Create price alert.
- Click affiliate link.
- Click voucher.

Giai doan dau co the log don gian trong database hoac console server. Ve sau tich hop PostHog/Plausible.

## 18. Bao mat

- Khong expose secret ra client.
- Khong tin input tu client.
- Validate tat ca request dau vao.
- Rate limit cac API de bi abuse nhu search, alert, affiliate click.
- Khong luu thong tin dang nhap Shopee cua nguoi dung.
- Khong luu thong tin thanh toan.

## 19. Quy uoc dat ten

- File va folder: kebab-case, vi du `product-card.tsx`, `deal-score-service.ts`.
- React component: PascalCase, vi du `ProductCard`.
- Function/variable: camelCase.
- Prisma model: PascalCase.
- Database field theo Prisma style: camelCase trong schema.

## 20. Khi them cong nghe moi

Chi them thu vien/cong nghe moi khi:

- Giai quyet duoc nhu cau ro rang.
- Khong lam phuc tap du an qua muc.
- Phu hop voi stack da chot.
- Duoc cap nhat vao file nay neu tro thanh quy uoc chung.

Moi thay doi lon ve kien truc nen cap nhat lai `PROJECT_RULES.md`.
