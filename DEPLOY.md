# Hostinger Deployment: SSH Method

Since the "Node.js" menu is missing, we will use the **SSH Access** option (which is visible in your screenshot).

## Step 1: Open SSH Terminal

1. In the left sidebar (under "Advanced"), click **SSH Access**.
2. On the main screen, look for a button that says **"Terminal"** or **"Web Terminal"**.
    * *If asked to "Enable SSH", click Enable first.*
3. A black screen (Terminal) will open.

## Step 2: Stop Old Process

The "dev" server might still be running and crashing. Let's stop it.
Type this and press Enter:

```bash
pkill -f node
```

*(If it says "no process found", that is fine).*

## Step 3: Check Directory

Type this to make sure you are in the right folder:

```bash
ls -F
```

* **If you see** `package.json` and `src/`, you are good.
* **If you see** `public_html/`, type: `cd public_html` then press Enter.

## Step 4: Build for Production

Run these commands one by one:

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Build the app:**

    ```bash
    npm run build:prod
    ```

    *(Wait for it to say "Compiled successfully").*

## Step 5: Start in Production

Now, start the server in optimized mode:

```bash
npm start
```

## Step 6: Verify

1. Keep the terminal open for a moment.
2. It should say: `> Ready on http://localhost:3000`.
3. Visit your website `new.fydhomes.in` in a new tab.
4. **If it works:** You are done!
5. **If you close the terminal and it stops working:** You might need to run it in the background. let me know if that happens.
