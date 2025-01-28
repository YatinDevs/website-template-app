## Setting up a Node.js environment :

1.  Install Node.js and npm

    - Download and Install Node.js:

              Visit Node.js official website and download the latest LTS version.

      - https://nodejs.org/en

             The installation includes npm (Node Package Manager).

    - Verify Installation:

                node -v
                npm -v

    - Manually Add Node.js to PATH (if needed) :

          Locate the Node.js installation directory. By default, it’s something like:

                C:\Program Files\nodejs

    - Add this directory to the PATH:

      - Press Win + R, type sysdm.cpl, and press Enter.
      - Go to the Advanced tab and click Environment Variables.
      - Under System variables, find Path and click Edit.
      - Add the path to the Node.js installation directory
        (e.g., C:\Program Files\nodejs).
      - Click OK to save.

    - Restart your terminal and try running node -v and npm -v again.

    1.  Bypass Execution Policy

        To fix this issue temporarily, you can bypass the execution policy for the current PowerShell session by running:

                Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

        After running this command, try executing npm -v again:

                 npm -v

    2.  Set Execution Policy for the Current User (Recommended)

        If you want a more permanent solution for your user account, change the execution policy to RemoteSigned, which allows locally created scripts to run while requiring remote scripts to be signed:

                Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

        Explanation:

        RemoteSigned: Allows running locally created scripts but requires remote scripts to be signed.

        CurrentUser: Applies the change only to the current user's account.

                    npm -v again to verify.

2.  Install PostgreSQL 16 and PGAdmin4

    - Download and Install PostgreSQL:

          Visit PostgreSQL official website and install the latest version.

      - https://www.postgresql.org/download/
      - https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

    - Setup PostgreSQL:

            During installation, set up a password for the postgres user.
            Use pgAdmin or CLI to manage your database.

3.  Setting Up github repository :

        echo "# CRM2025" >> README.md
        git init
        git add README.md
        git commit -m "first commit"
        git branch -M main
        git remote add origin https://github.com/YatinDevs/CRM2025.git
        git push -u origin main

## Folder Structure

        App/
        ├── config/
        │ └── db.js
        ├── controller/
        │ ├── authController.js
        │ └── adminController.js
        ├── middleware/
        │ ├── authMiddleware.js
        │ └── adminMiddleware.js
        ├── models/
        │ ├── User.js
        │ └── Admin.js
        ├── routes/
        │ ├── authRoutes.js
        │ └── adminRoutes.js
        ├── index.js
