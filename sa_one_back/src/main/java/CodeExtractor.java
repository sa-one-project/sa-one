import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

public class CodeExtractor {

    // 1. 추출할 대상 설정 (현재 폴더의 src)
    private static final String SRC_DIR_NAME = "src";
    private static final String OUTPUT_FILE = "backend_src_all_code.txt";

    // 2. 포함할 확장자 (백엔드 개발에 필요한 소스 코드)
    private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<>(Arrays.asList(
            ".java",
            ".xml",
            ".yml",
            ".yaml",
            ".properties",
            ".sql",
            ".gradle",  // Gradle 프로젝트인 경우
            ".txt",
            ".md"
    ));

    // 3. 제외할 파일명
    private static final Set<String> IGNORE_FILES = new HashSet<>(Arrays.asList(
            "mvnw", "mvnw.cmd", ".DS_Store"
    ));

    private static int fileCount = 0;

    public static void main(String[] args) {
        Path rootPath = Paths.get(".").toAbsolutePath().normalize();
        Path srcPath = rootPath.resolve(SRC_DIR_NAME);
        File outputFile = new File(OUTPUT_FILE);

        // 기존 결과 파일이 있으면 삭제
        if (outputFile.exists()) {
            outputFile.delete();
        }

        System.out.println("--- 추출 시작 ---");

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile, StandardCharsets.UTF_8))) {

            if (!Files.exists(srcPath)) {
                System.err.println("에러: " + SRC_DIR_NAME + " 폴더를 찾을 수 없습니다.");
                return;
            }

            // 재귀적으로 파일 탐색
            processDirectory(srcPath, srcPath, writer);

            System.out.println("\n" + "=".repeat(30));
            if (fileCount > 0) {
                System.out.println("✅ 완료! 총 " + fileCount + "개의 파일이 추출되었습니다.");
                System.out.println("결과 파일: " + OUTPUT_FILE);
            } else {
                System.out.println("⚠️ 추출된 파일이 없습니다. src 폴더 위치를 확인해주세요.");
            }
            System.out.println("=".repeat(30));

        } catch (IOException e) {
            System.err.println("실행 중 에러 발생: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void processDirectory(Path currentDir, Path rootSrcPath, BufferedWriter writer) throws IOException {
        try (Stream<Path> stream = Files.list(currentDir)) {
            stream.forEach(path -> {
                try {
                    if (Files.isDirectory(path)) {
                        processDirectory(path, rootSrcPath, writer);
                    } else {
                        extractFile(path, rootSrcPath, writer);
                    }
                } catch (IOException e) {
                    System.err.println("파일 처리 중 에러: " + path + " - " + e.getMessage());
                }
            });
        }
    }

    private static void extractFile(Path filePath, Path rootSrcPath, BufferedWriter writer) throws IOException {
        String fileName = filePath.getFileName().toString();
        String ext = "";

        int i = fileName.lastIndexOf('.');
        if (i > 0) {
            ext = fileName.substring(i).toLowerCase();
        }

        if (ALLOWED_EXTENSIONS.contains(ext) && !IGNORE_FILES.contains(fileName)) {
            // 상대 경로 계산 (src/main/java/...)
            String relativePath = SRC_DIR_NAME + File.separator + rootSrcPath.relativize(filePath).toString();

            // 윈도우의 역슬래시를 슬래시로 통일 (가독성 위해)
            relativePath = relativePath.replace("\\", "/");

            System.out.println("추출 중: " + relativePath);

            // 파일 읽기
            String content = new String(Files.readAllBytes(filePath), StandardCharsets.UTF_8);

            // 포맷에 맞춰 쓰기
            writer.write("\n\n" + "=".repeat(50) + "\n");
            writer.write("FILE: " + relativePath + "\n");
            writer.write("=".repeat(50) + "\n\n");
            writer.write(content);

            fileCount++;
        }
    }
}