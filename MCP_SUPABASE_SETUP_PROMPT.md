# Supabase MCP Setup Prompt

Use this prompt in Cursor to quickly configure Supabase MCP for any project with all necessary credentials:

---

## Prompt Template

```
Configure Supabase MCP for this project with all backend credentials:

1. Find the Supabase project details:
   - Project Reference: Check the Supabase URL in codebase or dashboard
     * Codebase: Look in supabase config files (e.g., lib/backend/supabase/supabase.dart)
     * Dashboard: https://supabase.com/dashboard/project/[PROJECT_REF]
   - Anon Key: Found in codebase (usually in supabase config files)
   - Service Role Key: Get from Supabase Dashboard → Settings → API → service_role key
   - Access Token: Get from Supabase Dashboard → Settings → API → Access Token (for CLI operations)
     * ⚠️ Keep these secrets! Never commit to public repos.

2. Create or update .cursor/mcp.json with this structure:
   {
     "mcpServers": {
       "Supabase-[PROJECT_NAME]": {
         "url": "https://mcp.supabase.com/mcp?project_ref=[PROJECT_REF]",
         "headers": {},
         "metadata": {
           "project_ref": "[PROJECT_REF]",
           "supabase_url": "https://[PROJECT_REF].supabase.co",
           "anon_key": "[ANON_KEY]",
           "service_role_key": "[SERVICE_ROLE_KEY]",
           "access_token": "[ACCESS_TOKEN]"
         }
       }
     }
   }

3. Replace:
   - [PROJECT_NAME] with the actual project folder/directory name
   - [PROJECT_REF] with the actual Supabase project reference
   - [ANON_KEY] with your Supabase anon/public key
   - [SERVICE_ROLE_KEY] with your Supabase service_role key (from dashboard)
   - [ACCESS_TOKEN] with your Supabase access token (from dashboard, for CLI operations)

4. After creating the file, restart Cursor to activate the MCP connection.

5. Verify the connection by checking Tools & MCP settings - you should see "Supabase-[PROJECT_NAME]" with tools enabled.
```

---

## Quick Steps

1. **Find your Supabase project reference:**
   ```bash
   # Search for Supabase URL in codebase
   grep -r "supabase.co" . --include="*.dart" --include="*.ts" --include="*.js" --include="*.env*"
   ```
   Or check: `lib/backend/supabase/supabase.dart` or similar config files

2. **Get your project name:**
   - Use the root directory name of your project

3. **Get your Supabase keys:**
   - **Anon Key**: Check your codebase (e.g., `lib/backend/supabase/supabase.dart`)
   - **Service Role Key**: 
     * Go to Supabase Dashboard → Settings → API
     * Copy the `service_role` key (⚠️ Keep this secret!)
   - **Access Token**: 
     * Go to Supabase Dashboard → Settings → API
     * Copy the `Access Token` (for CLI operations)

4. **Create `.cursor/mcp.json`:**
   ```json
   {
     "mcpServers": {
       "Supabase-[YOUR_PROJECT_NAME]": {
         "url": "https://mcp.supabase.com/mcp?project_ref=[YOUR_PROJECT_REF]",
         "headers": {},
         "metadata": {
           "project_ref": "[YOUR_PROJECT_REF]",
           "supabase_url": "https://[YOUR_PROJECT_REF].supabase.co",
           "anon_key": "[YOUR_ANON_KEY]",
           "service_role_key": "[YOUR_SERVICE_ROLE_KEY]",
           "access_token": "[YOUR_ACCESS_TOKEN]"
         }
       }
     }
   }
   ```

4. **Restart Cursor**

5. **Verify in Tools & MCP settings**

---

## Example

For a project called "myapp" with project_ref "abc123xyz":

```json
{
  "mcpServers": {
    "Supabase-myapp": {
      "url": "https://mcp.supabase.com/mcp?project_ref=abc123xyz",
      "headers": {},
      "metadata": {
        "project_ref": "abc123xyz",
        "supabase_url": "https://abc123xyz.supabase.co",
        "anon_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "service_role_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "access_token": "sbp_..."
      }
    }
  }
}
```

**Note:** The `metadata` section stores project-specific credentials that Cursor can use to build and manage your backend. The service_role_key enables admin operations like migrations and secret management.

---

## Troubleshooting

- **MCP still shows wrong project?** 
  - Make sure you restarted Cursor completely
  - Check that `.cursor/mcp.json` is in the project root
  - Verify the project_ref matches your Supabase dashboard URL

- **Can't find project_ref?**
  - Check Supabase dashboard: Settings → General → Reference ID
  - Or look at your Supabase URL: `https://[PROJECT_REF].supabase.co`

- **Multiple Supabase projects?**
  - Each project should have its own `.cursor/mcp.json` with a unique name
  - Use descriptive names like "Supabase-projectname" to distinguish them

- **Where to find keys?**
  - **Anon Key**: Usually in your codebase config files (e.g., `lib/backend/supabase/supabase.dart`)
  - **Service Role Key**: Supabase Dashboard → Settings → API → service_role key
  - **Access Token**: Supabase Dashboard → Settings → API → Access Token
  - **Project Ref**: Part of your Supabase URL: `https://[PROJECT_REF].supabase.co`

## Security Notes

⚠️ **Important Security Considerations:**

- The `.cursor/mcp.json` file contains sensitive keys
- **DO NOT** commit this file to public repositories
- Add `.cursor/mcp.json` to your `.gitignore` file
- The service_role_key has full admin access - treat it as a secret
- Share this file only with trusted team members who need backend access
