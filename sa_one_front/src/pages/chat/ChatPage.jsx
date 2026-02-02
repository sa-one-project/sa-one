import React, { useMemo, useRef, useState } from "react";

const TODO_BANNER = "백엔드 데이터 필요";

function nowId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function addMinutesToTimeStr(timeStr, deltaMin) {

    const [h, m] = timeStr.split(":").map(Number);
    const total = h * 60 + m + deltaMin;
    const hh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
    const mm = ((total % 60) + 60) % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;

}

function mockEngine(input, context) {

const text = input.trim();

if (/(해결이 안돼|안돼요|안됩니다|도움이 필요|문의)/.test(text)) {
    return {
    type: "inquiry_draft",
    title: "문제 해결 요청",
    content: `상황: ${text}\n\n기대 결과:\n실제 결과:\n재현 방법:\n(추가로 스크린샷/시간대/매장 정보를 적어주세요)`,
    actions: [{ key: "CREATE_INQUIRY", label: "문의 등록하기" }],
    note: TODO_BANNER,
    };
}

if (/(주휴)/.test(text)) {
    return {
    type: "weekly_allowance_preview",
    summary: "이번주 주휴 대상(후보) 2명",
    items: [
        { name: "직원 A", reason: "주 5일 근무 예정(목데이터)" },
        { name: "직원 C", reason: "주 4일 + 총 15시간 이상(목데이터)" },
    ],
    note: "※ 정확 계산은 출근/스케줄/근태 데이터 연동 후 제공",
    };
}

if (/(공백|비는|부족|인원)/.test(text) && /(내일|오늘|이번주|다음주|\d{1,2}시)/.test(text)) {
    return {
    type: "gap_check",
    summary: "공백(부족) 구간 2개 발견(목데이터)",
    gaps: [
        { day: "내일", time: "13:00~14:00", required: 3, assigned: 2 },
        { day: "내일", time: "15:00~16:00", required: 3, assigned: 1 },
    ],
    actions: [
        { key: "SUGGEST_FILL", label: "채우기 추천 보기" },
    ],
    note: TODO_BANNER,
    };
}

const mMinStaff = text.match(/(최소|적어도)\s*(\d+)\s*명/);

if (mMinStaff) {
    const minStaff = Number(mMinStaff[2]);
    return {
    type: "min_staff_set",
    minStaff,
    summary: `피크 타임 최소 인원을 ${minStaff}명으로 설정했어요(로컬).`,
    note: "※ 나중에 매장 정책으로 저장 가능",
    };
}

const mBreak = text.match(/(\d+)\s*시간\s*이상.*(\d+)\s*분/);

if (/(휴게|브레이크|break)/i.test(text) && mBreak) {
    const hours = Number(mBreak[1]);
    const minutes = Number(mBreak[2]);
    return {
    type: "break_rule",
    summary: `${hours}시간 이상 근무 시 휴게 ${minutes}분 자동 삽입 룰을 제안합니다.`,
    actions: [{ key: "APPLY_BREAK_RULE", label: "룰 적용하기" }],
    note: TODO_BANNER,
    };
}

const mShift = text.match(/(시작|출근)\s*(\d+)\s*분\s*(늦|당겨)/);

if (mShift && /(전원|이번주|전체|다음주)/.test(text)) {
    const delta = Number(mShift[2]) * (mShift[3] === "늦" ? 1 : -1);
    return {
    type: "bulk_shift",
    summary: `선택 기간 스케줄의 시작 시간을 ${Math.abs(delta)}분 ${delta > 0 ? "늦추는" : "당기는"} 변경을 제안합니다.`,
    example: [
        { who: "직원 A", before: "10:00~18:00", after: `${addMinutesToTimeStr("10:00", delta)}~18:00` },
        { who: "직원 B", before: "12:00~20:00", after: `${addMinutesToTimeStr("12:00", delta)}~20:00` },
    ],
    actions: [{ key: "APPLY_BULK_SHIFT", label: "적용하기" }],
    note: TODO_BANNER,
    };
}

const mSwap = text.match(/(.+?)\s*대신\s*(.+?)\s*(로|으로)\s*바꿔/);

if (mSwap) {
    const from = mSwap[1].trim();
    const to = mSwap[2].trim();
    return {
    type: "swap",
    summary: `교대 제안: "${from}" → "${to}"`,
    actions: [{ key: "APPLY_SWAP", label: "적용하기" }],
    note: TODO_BANNER,
    };
}

if (/(지난주랑|똑같이|템플릿|평일 기본)/.test(text)) {

    return {
    type: "template_apply",
    summary: "템플릿 적용을 제안합니다: [평일 기본 템플릿](목데이터)",
    details: "월~금 10:00~18:00 / 휴게 30분(6시간 이상일 때)",
    actions: [{ key: "APPLY_TEMPLATE", label: "적용하기" }],
    note: TODO_BANNER,
    };
}

if (/(다음주|이번주)/.test(text) && /(평일|월~금|월-금)/.test(text) && /(\d{1,2})\s*~\s*(\d{1,2})/.test(text)) {

    const t = text.match(/(\d{1,2})\s*~\s*(\d{1,2})/);
    const startH = String(t[1]).padStart(2, "0");
    const endH = String(t[2]).padStart(2, "0");
    const person = (text.match(/([A-Za-z가-힣])\s*넣어/) || [])[1] || "직원A";

    return {
    type: "schedule_create",
    summary: `${person} / ${startH}:00~${endH}:00 / (다음주 평일) 생성 미리보기`,
    preview: [
        { day: "월", time: `${startH}:00~${endH}:00`, breakMin: 0 },
        { day: "화", time: `${startH}:00~${endH}:00`, breakMin: 0 },
        { day: "수", time: `${startH}:00~${endH}:00`, breakMin: 0 },
        { day: "목", time: `${startH}:00~${endH}:00`, breakMin: 0 },
        { day: "금", time: `${startH}:00~${endH}:00`, breakMin: 0 },
    ],
    actions: [{ key: "APPLY_SCHEDULE_CREATE", label: "적용하기" }],
    note: TODO_BANNER,
    };
}

return {
    type: "help",
    summary: "아래 예시처럼 말해주면 도와줄게요.",
    examples: [
    "다음주 평일 10~18로 A 넣어줘",
    "지난주랑 똑같이 적용해줘",
    "토요일 B 대신 A로 바꿔줘",
    "이번주 전원 시작 30분 늦춰",
    "6시간 이상이면 30분 휴게 넣어줘",
    "이번주 주휴 대상 누구야?",
    "내일 13~16에 사람 비는 시간 있어?",
    "피크 타임 최소 3명으로 해줘",
    "이거 해결이 안돼요 (→ 문의 초안 생성)",
    ],
};
}

function ChatPage() {

const [messages, setMessages] = useState(() => [
    {
    id: nowId(),
    role: "assistant",
    text:
        "사장님, 스케줄/인력/주휴/문의까지 도와드릴게요.\n" +
        "원하시는 걸 자연어로 말해보세요. (예: 다음주 평일 10~18로 A 넣어줘)",
    },
]);

const [minStaff, setMinStaff] = useState(3); // 로컬 설정
const [input, setInput] = useState("");
const bottomRef = useRef(null);

const quickActions = useMemo(
    () => [
    { label: "다음주 평일 스케줄 생성", text: "다음주 평일 10~18로 A 넣어줘" },
    { label: "지난주 템플릿 적용", text: "지난주랑 똑같이 적용해줘" },
    { label: "교대 요청", text: "토요일 B 대신 A로 바꿔줘" },
    { label: "일괄 수정", text: "이번주 전원 시작 30분 늦춰" },
    { label: "휴게 룰", text: "6시간 이상이면 30분 휴게 넣어줘" },
    { label: "주휴 대상", text: "이번주 주휴 대상 누구야?" },
    { label: "공백 탐지", text: `내일 13~16에 사람 비는 시간 있어? (최소 ${minStaff}명)` },
    { label: "문의 초안", text: "이거 해결이 안돼요" },
    ],
    [minStaff]
);

const send = (text) => {

    if (!text.trim()) return;

    const userMsg = { id: nowId(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    const result = mockEngine(text, { minStaff });

    if (result.type === "min_staff_set" && typeof result.minStaff === "number") {
    setMinStaff(result.minStaff);
    }

    const assistantMsg = { id: nowId(), role: "assistant", payload: result };
    setMessages((prev) => [...prev, assistantMsg]);

    setInput("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
};

const renderAssistantPayload = (p) => {
    if (!p) return null;

    const Card = ({ title, children }) => (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, background: "#fff" }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>{title}</div>
        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{children}</div>
    </div>
    );

    const ActionRow = ({ actions }) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
        {actions?.map((a) => (
        <button
            key={a.key}
            onClick={() => alert(`${a.label}\n\n${TODO_BANNER}`)}
            style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            background: "#f9fafb",
            cursor: "pointer",
            fontWeight: 700,
            }}
        >
            {a.label}
        </button>
        ))}
    </div>
    );

    switch (p.type) {
    case "schedule_create":
        return (
        <div style={{ display: "grid", gap: 10 }}>
            <Card title={p.summary}>
            {p.note && <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>{p.note}</div>}
            {p.preview?.map((row, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{row.day}</span>
                <span>{row.time}</span>
                </div>
            ))}
            <ActionRow actions={p.actions} />
            </Card>
        </div>
        );

    case "template_apply":
    case "swap":
    case "bulk_shift":
    case "break_rule":
        return (
        <Card title={p.summary}>
            {p.details && <div>{p.details}</div>}
            {p.example?.length ? (
            <div style={{ marginTop: 8 }}>
                {p.example.map((e, i) => (
                <div key={i}>
                    - {e.who}: {e.before} → {e.after}
                </div>
                ))}
            </div>
            ) : null}
            {p.note && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>{p.note}</div>}
            <ActionRow actions={p.actions} />
        </Card>
        );

    case "weekly_allowance_preview":
        return (
        <Card title={p.summary}>
            {p.items?.map((it, i) => (
            <div key={i}>
                - {it.name}: {it.reason}
            </div>
            ))}
            {p.note && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>{p.note}</div>}
        </Card>
        );

    case "gap_check":
        return (
        <Card title={p.summary}>
            {p.gaps?.map((g, i) => (
            <div key={i}>
                - {g.day} {g.time}: 필요 {g.required}명 / 배정 {g.assigned}명
            </div>
            ))}
            {p.note && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>{p.note}</div>}
            <ActionRow actions={p.actions} />
        </Card>
        );

    case "inquiry_draft":
        return (
        <Card title="문의 초안 생성">
            <div style={{ fontWeight: 700 }}>제목</div>
            <div style={{ marginBottom: 10 }}>{p.title}</div>
            <div style={{ fontWeight: 700 }}>내용</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{p.content}</div>
            {p.note && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>{p.note}</div>}
            <ActionRow actions={p.actions} />
        </Card>
        );

    case "min_staff_set":
        return (
        <Card title={p.summary}>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{p.note}</div>
        </Card>
        );

    default:
        return (
        <Card title={p.summary || "도움말"}>
            {p.examples?.map((ex, i) => (
            <div key={i}>- {ex}</div>
            ))}
        </Card>
        );
    }
};

return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
        <h2 style={{ margin: 0 }}>사장님 챗봇</h2>
        <div style={{ fontSize: 12, color: "#6b7280" }}>피크 최소 인원(로컬): {minStaff}명</div>
    </div>

    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {quickActions.map((a) => (
        <button
            key={a.label}
            onClick={() => send(a.text)}
            style={{
            padding: "8px 10px",
            borderRadius: 999,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 13,
            }}
        >
            {a.label}
        </button>
        ))}
    </div>

    <div
        style={{
        marginTop: 14,
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 12,
        background: "#f9fafb",
        height: "65vh",
        overflow: "auto",
        }}
    >
        <div style={{ display: "grid", gap: 10 }}>
        {messages.map((m) => {
            const isUser = m.role === "user";
            return (
            <div
                key={m.id}
                style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                }}
            >
                <div
                style={{
                    maxWidth: "80%",
                    padding: 12,
                    borderRadius: 14,
                    background: isUser ? "#111827" : "#ffffff",
                    color: isUser ? "#ffffff" : "#111827",
                    border: isUser ? "none" : "1px solid #e5e7eb",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.5,
                }}
                >
                {isUser ? m.text : renderAssistantPayload(m.payload) || m.text}
                </div>
            </div>
            );
        })}
        <div ref={bottomRef} />
        </div>
    </div>

    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="예: 다음주 평일 10~18로 A 넣어줘"
        style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
        }}
        onKeyDown={(e) => {
            if (e.key === "Enter") send(input);
        }}
        />
        <button
        onClick={() => send(input)}
        style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #111827",
            background: "#111827",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
        }}
        >
        전송
        </button>
    </div>
    </div>
);
}

export default ChatPage;