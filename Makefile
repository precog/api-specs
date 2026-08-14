.PHONY: docs

docs:
	@echo "Serving API docs at http://localhost:8080/docs/"
	python3 -m http.server 8080
