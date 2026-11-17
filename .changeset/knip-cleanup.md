---
'@cherrystudio/ai-core': patch
---

Remove dead source files and unused dependencies identified by a knip audit; add knip.json + `pnpm knip` script. Drops MS Office document import from the knowledge base (doc/docx/xls/xlsx/pptx); other formats unaffected. Fixes a startup crash caused by a pdf-parse version collision (ERR_PACKAGE_PATH_NOT_EXPORTED).
