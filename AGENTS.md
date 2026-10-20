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
- The hero uses a bundled full-bleed connected landscape illustration with isolated hero styles; do not couple opening changes to the territory section. Any future geographic artwork must use precise vector geometry, not AI-generated outlines.
- Keep /galeria as a client navigation redirect to / after retiring comparison options, preserving the existing preview URL.
