# Accessibility & Architecture Audit Report

## Required audit worksheet

The final issue register is `../accessibility-audit.csv` and follows the provided worksheet columns exactly:

`issue_id,page_or_component,wcag_reference,evidence,severity,user_impact,recommended_fix,owner,status`

The five rows WEB-001 through WEB-005 are intentionally blank until the actual Lighthouse and keyboard-only audit is completed. The two sample rows in the supplied template were treated as examples, not as observed defects. fileciteturn12file0L10-L12

## Audit target

**Website:** National Portal of India  
**URL:** https://www.india.gov.in/  
**Audit date:** __________________  
**Auditor:** __________________  
**Browser/version:** __________________  
**Viewport:** __________________

## Standards/reference

Use the current GIGW accessibility guidance and WCAG 2.1 criteria as the reference baseline.

Official references:
- https://guidelines.india.gov.in/accessibility-guidelines-and-attributes/
- https://guidelines.india.gov.in/annexure-ii-matrix-to-check-conformity/

---

## 1. Lighthouse evidence

| Category | Score |
|---|---:|
| Accessibility | ___ / 100 |
| Best Practices | ___ / 100 |
| Performance | ___ / 100 |
| SEO | ___ / 100 |

### Lighthouse screenshot

Place the screenshot at:

```text
screenshots/lighthouse.png
```

### Failed/flagged audits

| Audit | Evidence | Priority | Remediation |
|---|---|---|---|
| __________________ | __________________ | P0/P1/P2 | __________________ |
| __________________ | __________________ | P0/P1/P2 | __________________ |
| __________________ | __________________ | P0/P1/P2 | __________________ |

---

# 2. Five issues

> Fill these from actual Lighthouse output and keyboard testing. The examples below are evidence slots, not pre-claimed defects.

## Issue 01 — Accessibility

**Title:** ______________________________

**Evidence:**  
- Lighthouse audit: __________________
- Screenshot: `screenshots/issue-01.png`
- Element/page: __________________

**WCAG/GIGW reference:** __________________

**Priority:** P0 / P1 / P2

**Impact:**  
________________________________________

**Recommended remediation:**  
________________________________________

---

## Issue 02 — Keyboard navigation

**Title:** ______________________________

**Evidence:**  
- Key sequence: __________________
- Observed behavior: __________________
- Screenshot: `screenshots/issue-02.png`

**WCAG/GIGW reference:** __________________

**Priority:** P0 / P1 / P2

**Impact:**  
________________________________________

**Recommended remediation:**  
________________________________________

---

## Issue 03 — Focus / interaction

**Title:** ______________________________

**Evidence:**  
- Element: __________________
- Focus behavior: __________________
- Screenshot: `screenshots/issue-03.png`

**WCAG/GIGW reference:** __________________

**Priority:** P0 / P1 / P2

**Impact:**  
________________________________________

**Recommended remediation:**  
________________________________________

---

## Issue 04 — Structure / content

**Title:** ______________________________

**Evidence:**  
- Heading/landmark/form/image: __________________
- Screenshot: `screenshots/issue-04.png`

**WCAG/GIGW reference:** __________________

**Priority:** P0 / P1 / P2

**Impact:**  
________________________________________

**Recommended remediation:**  
________________________________________

---

## Issue 05 — Architecture / maintainability

**Title:** ______________________________

**Evidence:**  
- Repeated UI / inconsistent structure / script dependency / other: __________________
- Screenshot or source evidence: __________________

**Reference:** __________________

**Priority:** P0 / P1 / P2

**Impact:**  
________________________________________

**Recommended remediation:**  
________________________________________

---

# 3. Prioritization matrix

| Priority | Meaning |
|---|---|
| P0 | Blocks access or a critical task |
| P1 | Serious accessibility/usability problem |
| P2 | Important improvement with lower immediate impact |

| Issue | Priority | Reason |
|---|---|---|
| 01 | ___ | __________________ |
| 02 | ___ | __________________ |
| 03 | ___ | __________________ |
| 04 | ___ | __________________ |
| 05 | ___ | __________________ |

---

# 4. Audit conclusion

### Strengths

- ________________________________________
- ________________________________________

### Main risks

- ________________________________________
- ________________________________________

### Recommended first sprint

1. Fix P0 findings.
2. Fix P1 keyboard/focus issues.
3. Fix semantic structure and form labeling.
4. Add automated accessibility checks to CI.
5. Repeat Lighthouse and keyboard audit.

