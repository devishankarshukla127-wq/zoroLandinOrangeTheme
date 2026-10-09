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

- Keep the Zorro-X home experience in the index route with reusable presentation components; the provided reference defines its information architecture.
- Keep redesign interactions client-side and do not invent live export rules or connected services; this project contains no existing service integration.
- Define all editorial colors, typography, surfaces and control variants in the global design system so presentation stays consistent.
- Keep navigation in a reusable client-side shell using the existing router location and preserved home-section actions; read collapse storage after hydration and use Radix dialogs/tooltips for accessible mobile and compact navigation.
