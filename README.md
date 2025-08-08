# Vue 3 Order Queue System

This is the exact same order queue application as the React version, but rebuilt entirely in Vue 3. It has **100% identical functionality** to your React version.

## 🎯 Identical Features

✅ **5-card display** showing student orders  
✅ **Order counter** in header (shows total orders)  
✅ **Fixed bottom "Next" button** always visible  
✅ **Smooth slide-up animations** when new cards appear  
✅ **Status indicators** (ready/preparing/received)  
✅ **Student avatars** with initials and rotating colors  
✅ **Order type badges** (Lanche/Sobremesa)  
✅ **Real-time updates** with auto-refresh  

## 🚀 How to Run

### Prerequisites
- The existing Express.js backend must be running on port 5000
- Node.js installed on your system

### Setup Steps

1. **Navigate to the Vue project directory:**
   ```bash
   cd vue-version
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vue development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Vue app will run on: `http://localhost:3000`
   - Backend API runs on: `http://localhost:5000`

## 📁 Project Structure

```
vue-version/
├── src/
│   ├── components/
│   │   └── OrderCard.vue        # Individual order card component
│   ├── views/
│   │   └── OrderQueue.vue       # Main order queue page
│   ├── composables/
│   │   └── useApi.ts           # API functions (like React's queryClient)
│   ├── types/
│   │   └── order.ts            # TypeScript interfaces
│   ├── App.vue                 # Root component
│   ├── main.ts                 # App entry point
│   └── style.css               # Global styles
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔄 Vue vs React Differences

| Feature | React Version | Vue 3 Version |
|---------|---------------|---------------|
| **Hooks** | `useState`, `useEffect` | `ref`, `computed`, `watch` |
| **State Management** | TanStack React Query | TanStack Vue Query |
| **Routing** | Wouter | Vue Router |
| **Animations** | Framer Motion | Vue Transitions |
| **Templates** | JSX | Vue Template Syntax |
| **Component Style** | Function Components | Composition API |

## 🎨 Same Visual Design

- **Dark theme** with slate-900 background
- **Blue accent** colors (#3B82F6)
- **Card layout** with white backgrounds
- **Tailwind CSS** for styling
- **Responsive design** for mobile-first experience

## 🔗 API Integration

The Vue app connects to the same Express.js backend:
- `GET /api/orders` - Fetch all orders
- `POST /api/orders/:id/next` - Move order to end of queue
- `PATCH /api/orders/:id/status` - Update order status

## 💡 Key Vue 3 Features Used

- **Composition API** for reactive state management
- **TypeScript** with full type safety
- **Vue Router** for client-side routing
- **TransitionGroup** for smooth list animations
- **Computed properties** for derived state
- **Template refs** for DOM access

## 🚀 Production Build

```bash
npm run build
npm run preview
```

## 📝 Notes

- The Vue version is completely standalone
- Uses the same backend API as React version
- Maintains identical UX and functionality
- Can run simultaneously with React version on different ports
- Perfect for comparing frameworks or migrating between them

Both versions are functionally identical - choose based on your framework preference!