# Deployment repository sync

The `Sync Vercel deployment repository` workflow validates every update to
`armagansenol/citys-residences` `main`, merges it into
`justdesigndev/citys-residences` `main`, and lets the target repository's
Vercel integration deploy the result.

The workflow never force-pushes. A merge conflict or failed validation stops
the sync without changing the deployment repository.

## Configure the deploy key

Generate a dedicated key outside the repository:

```bash
ssh-keygen -t ed25519 -C "citys-residences-deployment-sync" -f ~/.ssh/citys-residences-deployment-sync
```

1. Open `justdesigndev/citys-residences` on GitHub.
2. Go to **Settings → Deploy keys → Add deploy key**.
3. Add `~/.ssh/citys-residences-deployment-sync.pub` and enable
   **Allow write access**.
4. Open `armagansenol/citys-residences` on GitHub.
5. Go to **Settings → Secrets and variables → Actions → New repository secret**.
6. Create `JUSTDESIGN_DEPLOY_KEY` using the complete contents of
   `~/.ssh/citys-residences-deployment-sync`.
7. Delete the local private key after confirming the workflow succeeds. Keep
   the public key only if it is useful for identifying the deploy key later.

## Validate the setup

After this workflow is merged into the source repository:

1. Open **Actions → Sync Vercel deployment repository**.
2. Select **Run workflow** on `main`.
3. Confirm the validation and sync jobs pass.
4. Confirm `justdesigndev/citys-residences` receives a merge commit.
5. Confirm the connected Vercel project starts a deployment.

The target repository may also contain this workflow after synchronization.
Its jobs are restricted to `armagansenol/citys-residences`, so they remain
skipped in the deployment repository and cannot create a sync loop.
