<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Indicators live in `public.metrics` (rows `draft` and `published`); writes go only through the `save_metrics` security-definer RPC so saving/publishing and history logging are atomic and admin-checked.
- Admin permission comes from `public.user_roles` + `has_role()`; there is no self-service role grant. First admin: create the account in Cloud → Users → Add user, then insert its id into `user_roles` with role `admin` via SQL.
- Public page reads metrics/settings via the browser client under anon RLS; `/admin` is client-only (`ssr: false`).
- Hero geographic artwork uses uniformly scaled copies of the native Alagoas path from bundled, openly licensed boundaries for layered depth; keep the scene and its styles isolated from the territory section so opening-only changes never alter other sections.
